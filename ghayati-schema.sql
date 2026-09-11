-- ============================================================
--  غايتي — مخطط قاعدة البيانات (المرحلة الأولى)
--  انسخ الملف ده كله، وحطه في Supabase > SQL Editor > New query > Run
--  شغّله مرة واحدة بس على مشروع جديد فاضي.
-- ============================================================

-- ---------- ١. الملفات الشخصية ----------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text not null,
  role        text not null default 'parent' check (role in ('parent','teacher','admin')),
  phone       text,
  created_at  timestamptz not null default now()
);

-- ---------- ٢. المعلّمون ----------
create table if not exists public.teachers (
  id          uuid primary key references public.profiles(id) on delete cascade,
  specialty   text,
  bio         text,
  price_egp   integer default 0,
  verified    boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ---------- ٣. الأطفال ----------
create table if not exists public.children (
  id          uuid primary key default gen_random_uuid(),
  parent_id   uuid not null references public.profiles(id) on delete cascade,
  teacher_id  uuid references public.teachers(id) on delete set null,
  name        text not null,
  birth_year  integer,
  current_juz integer default 30,
  created_at  timestamptz not null default now()
);
create index if not exists children_parent_idx  on public.children(parent_id);
create index if not exists children_teacher_idx on public.children(teacher_id);

-- ---------- ٤. سجل التقدّم ----------
create table if not exists public.progress_entries (
  id          uuid primary key default gen_random_uuid(),
  child_id    uuid not null references public.children(id) on delete cascade,
  entry_date  date not null default current_date,
  juz         integer,
  surah       text,
  ayat_count  integer default 0,
  attended    boolean not null default true,
  review_rate integer check (review_rate between 0 and 100),
  note        text,
  created_by  uuid references public.profiles(id),
  created_at  timestamptz not null default now()
);
create index if not exists progress_child_idx on public.progress_entries(child_id, entry_date desc);

-- ---------- ٥. المنشورات ----------
create table if not exists public.posts (
  id          uuid primary key default gen_random_uuid(),
  author_id   uuid not null references public.profiles(id) on delete cascade,
  body        text not null,
  status      text not null default 'pending' check (status in ('pending','published','rejected')),
  created_at  timestamptz not null default now()
);

-- ============================================================
--  دالة مساعدة: بتجيب دور المستخدم الحالي
--  security definer عشان ما يحصلش تكرار لا نهائي في سياسات profiles
-- ============================================================
create or replace function public.my_role()
returns text
language sql
stable
security definer
set search_path = public
as $$ select role from public.profiles where id = auth.uid() $$;

-- ============================================================
--  تفعيل الحماية على مستوى الصف — أهم جزء في الملف
--  من غير ده أي حد يقدر يقرا بيانات كل الأطفال
-- ============================================================
alter table public.profiles         enable row level security;
alter table public.teachers         enable row level security;
alter table public.children         enable row level security;
alter table public.progress_entries enable row level security;
alter table public.posts            enable row level security;

-- ---------- سياسات: الملفات الشخصية ----------
create policy "يقرا ملفه الشخصي"
  on public.profiles for select
  using (id = auth.uid() or role = 'teacher' or public.my_role() = 'admin');

create policy "ينشئ ملفه الشخصي"
  on public.profiles for insert
  with check (id = auth.uid());

create policy "يعدّل ملفه الشخصي"
  on public.profiles for update
  using (id = auth.uid() or public.my_role() = 'admin');

-- ---------- سياسات: المعلّمون ----------
create policy "أي مستخدم مسجّل يقرا المعلّمين"
  on public.teachers for select
  using (auth.uid() is not null);

create policy "المعلّم يدير ملفه"
  on public.teachers for all
  using (id = auth.uid() or public.my_role() = 'admin')
  with check (id = auth.uid() or public.my_role() = 'admin');

-- ---------- سياسات: الأطفال ----------
create policy "ولي الأمر يدير أولاده"
  on public.children for all
  using (parent_id = auth.uid())
  with check (parent_id = auth.uid());

create policy "المعلّم يقرا طلابه بس"
  on public.children for select
  using (teacher_id = auth.uid() or public.my_role() = 'admin');

-- ---------- سياسات: التقدّم ----------
create policy "ولي الأمر يقرا تقدّم أولاده"
  on public.progress_entries for select
  using (exists (
    select 1 from public.children c
    where c.id = progress_entries.child_id and c.parent_id = auth.uid()
  ));

create policy "المعلّم يقرا تقدّم طلابه"
  on public.progress_entries for select
  using (exists (
    select 1 from public.children c
    where c.id = progress_entries.child_id and c.teacher_id = auth.uid()
  ) or public.my_role() = 'admin');

create policy "المعلّم يكتب تقدّم طلابه"
  on public.progress_entries for insert
  with check (exists (
    select 1 from public.children c
    where c.id = progress_entries.child_id and c.teacher_id = auth.uid()
  ) or public.my_role() = 'admin');

create policy "ولي الأمر يكتب ملاحظة لأولاده"
  on public.progress_entries for insert
  with check (exists (
    select 1 from public.children c
    where c.id = progress_entries.child_id and c.parent_id = auth.uid()
  ));

-- ---------- سياسات: المنشورات ----------
create policy "الكل يقرا المنشور بعد النشر"
  on public.posts for select
  using (status = 'published' or author_id = auth.uid() or public.my_role() = 'admin');

create policy "المستخدم ينشر باسمه"
  on public.posts for insert
  with check (author_id = auth.uid());

create policy "الإدارة تراجع المنشورات"
  on public.posts for update
  using (public.my_role() = 'admin');

-- ============================================================
--  إنشاء الملف الشخصي تلقائيًا بعد التسجيل
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'مستخدم جديد'),
    coalesce(new.raw_user_meta_data->>'role', 'parent')
  );
  if coalesce(new.raw_user_meta_data->>'role','parent') = 'teacher' then
    insert into public.teachers (id, specialty) values (new.id, 'تحفيظ');
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
--  اختبار الأمان — نفّذه بعد ما تسجّل حسابين مختلفين
--  سجّل دخول بحساب ولي أمر (أ) وجرّب:
--     select * from public.children;
--  المفروض تشوف أولادك إنت بس. لو شفت أولاد حساب تاني، وقّف كل حاجة.
-- ============================================================
