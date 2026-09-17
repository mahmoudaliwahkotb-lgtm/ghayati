import React from 'react';
import { Teacher, BookingState } from '../types.ts';

interface Step4SuccessProps {
  state: BookingState;
  teacher: Teacher;
  onReset: () => void;
}

export const Step4Success: React.FC<Step4SuccessProps> = ({
  state,
  teacher,
  onReset,
}) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Celebratory Banner */}
      <section className="bg-gradient-to-br from-[#004357] to-[#0d5c75] text-white p-5 rounded-2xl shadow-md text-center space-y-2 relative overflow-hidden">
        <div className="w-12 h-12 rounded-full bg-white/15 text-white flex items-center justify-center mx-auto mb-1">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            task_alt
          </span>
        </div>
        <h1 className="text-[22px] font-bold">تم تأكيد موعد الجلسة التجريبية بنجاح!</h1>
        <p className="text-[13px] text-[#bde9ff] leading-relaxed max-w-sm mx-auto">
          سعداء بمرافقة طفلك <span className="font-bold underline text-white">{state.childName || 'عمر'}</span> في هذه الرحلة المباركة والممتعة.
        </p>
      </section>

      {/* Live Session Scheduled Card */}
      <div className="bg-white rounded-2xl border border-[#bfc8cd]/40 p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#bfc8cd]/30">
          <span className="text-[12px] font-bold text-[#9a442d] bg-[#ffdbd2] px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9a442d] animate-ping"></span>
            جلسة تفاعلية مباشرة
          </span>
          <span className="text-[12px] text-[#70787d]">المدة: ٢٠ دقيقة مجانية</span>
        </div>

        {/* Teacher and Timing */}
        <div className="flex items-start gap-3">
          <img
            src={teacher.avatar}
            alt={teacher.name}
            referrerPolicy="no-referrer"
            className="w-14 h-14 rounded-xl object-cover border border-[#bfc8cd]/40"
          />
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-[15px] text-[#004357]">{teacher.name}</h3>
              <span className="material-symbols-outlined text-sm text-[#004357]">verified</span>
            </div>
            <p className="text-[11px] text-[#40484c]">{teacher.title}</p>
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#004357] mt-1 bg-[#f3f4f3] px-2 py-1 rounded-lg w-fit">
              <span className="material-symbols-outlined text-sm text-[#9a442d]">event</span>
              <span>{state.selectedDay || 'اليوم'} • {state.selectedTime || '٠٥:٣٠ م'}</span>
            </div>
          </div>
        </div>

        {/* Meeting Actions */}
        <div className="space-y-2 pt-1">
          <a
            href="https://meet.google.com"
            target="_blank"
            rel="noopener noreferrer"
            id="join-meeting-btn"
            className="w-full h-11 bg-[#004357] hover:bg-[#0d5c75] text-white rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-base">videocam</span>
            <span>دخول القاعة الافتراضية (Google Meet)</span>
          </a>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={`https://wa.me/966${state.parentPhone?.replace(/^0/, '') || '551234567'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              <span>محادثة المعلم واتساب</span>
            </a>

            <button
              type="button"
              onClick={() => alert('تمت إضافة الجلسة إلى تقويمك بنجاح!')}
              className="h-10 bg-[#f9f9f8] text-[#004357] border border-[#bfc8cd]/50 rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5 hover:bg-[#eeeeed] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              <span>إضافة للتقويم</span>
            </button>
          </div>
        </div>
      </div>

      {/* Curriculum Roadmap Stepper */}
      <section className="bg-white rounded-2xl border border-[#bfc8cd]/40 p-4 shadow-sm space-y-3">
        <h2 className="text-[15px] font-bold text-[#004357] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-base text-[#9a442d]">alt_route</span>
          <span>خطة رحلة تعلّم طفلك (المراحل الأولى)</span>
        </h2>

        <div className="relative pr-6 space-y-4 before:absolute before:right-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#bfc8cd]/40">
          <div className="relative">
            <span className="absolute -right-6 top-0.5 w-4 h-4 rounded-full bg-[#004357] ring-4 ring-[#bde9ff] text-white flex items-center justify-center text-[9px] font-bold">
              ١
            </span>
            <div>
              <h4 className="text-[13px] font-bold text-[#004357]">الجلسة الاستكشافية المجانية (٢٠ دقيقة)</h4>
              <p className="text-[11px] text-[#40484c] mt-0.5">
                تقييم مخارج الحروف، كسر حاجز الخجل، وتحديد نقطة الانطلاق الفردية للطفل.
              </p>
            </div>
          </div>

          <div className="relative">
            <span className="absolute -right-6 top-0.5 w-4 h-4 rounded-full bg-[#e8e8e7] text-[#70787d] flex items-center justify-center text-[9px] font-bold">
              ٢
            </span>
            <div>
              <h4 className="text-[13px] font-semibold text-[#1a1c1c]">التهجئة والقاعدة النورانية</h4>
              <p className="text-[11px] text-[#40484c] mt-0.5">
                تثبيت الحركات والمدود بأسلوب القصص والأناشيد التربوية المحببة.
              </p>
            </div>
          </div>

          <div className="relative">
            <span className="absolute -right-6 top-0.5 w-4 h-4 rounded-full bg-[#e8e8e7] text-[#70787d] flex items-center justify-center text-[9px] font-bold">
              ٣
            </span>
            <div>
              <h4 className="text-[13px] font-semibold text-[#1a1c1c]">تلاوة وحفظ قصار السور</h4>
              <p className="text-[11px] text-[#40484c] mt-0.5">
                ترسيخ الحفظ التلقيني بالترتيل السليم والتشجيع المستمر.
              </p>
            </div>
          </div>

          <div className="relative">
            <span className="absolute -right-6 top-0.5 w-4 h-4 rounded-full bg-[#e8e8e7] text-[#70787d] flex items-center justify-center text-[9px] font-bold">
              ٤
            </span>
            <div>
              <h4 className="text-[13px] font-semibold text-[#1a1c1c]">تقرير إنجاز أسبوعي لولي الأمر</h4>
              <p className="text-[11px] text-[#40484c] mt-0.5">
                تسجيلات صوتية لتقدم طفلك ونقاط تطوره الملموسة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advice for Parent before session */}
      <section className="bg-[#f3f4f3] rounded-2xl p-3.5 border border-[#bfc8cd]/30 space-y-2">
        <h3 className="text-[13px] font-bold text-[#004357] flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">tips_and_updates</span>
          <span>نصائح غايتي قبل بدء الجلسة:</span>
        </h3>
        <ul className="text-[11px] text-[#40484c] space-y-1 list-disc pr-4 leading-relaxed">
          <li>اختر مكاناً هادئاً وخالياً من المشتتات لطفلك.</li>
          <li>يُفضل استخدام جهاز حاسوب أو لوحي (آيباد) بشاشة واضحة وسماعة أذن مريحة.</li>
          <li>تواجد بجوار طفلك في أول دقيقتين لمنحه الاطمئنان والدعم الإيجابي.</li>
        </ul>
      </section>

      {/* Restart / explore another child */}
      <div className="text-center pt-2">
        <button
          onClick={onReset}
          className="text-xs text-[#004357] underline font-semibold cursor-pointer"
        >
          البدء من جديد أو إضافة طفل آخر
        </button>
      </div>
    </div>
  );
};
