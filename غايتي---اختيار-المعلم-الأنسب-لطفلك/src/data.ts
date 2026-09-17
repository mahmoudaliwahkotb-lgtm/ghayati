import {
  SubjectOption,
  AcademicStageOption,
  LearningGoalOption,
  DayOption,
  BudgetTierOption,
  Teacher
} from './types.ts';

export const SUBJECTS: SubjectOption[] = [
  {
    id: 'quran',
    title: 'القرآن والتجويد',
    subtitle: 'حفظ، تلاوة وتدبر معتمد',
    icon: 'menu_book',
    isPopular: true,
  },
  {
    id: 'arabic',
    title: 'اللغة العربية',
    subtitle: 'القراءة، الإملاء والخط',
    icon: 'edit_note',
  },
  {
    id: 'english',
    title: 'اللغة الإنجليزية',
    subtitle: 'محادثة وتأسيس فونكس',
    icon: 'translate',
  },
  {
    id: 'math',
    title: 'الرياضيات والعلوم',
    subtitle: 'مهارات حساب وتفكير منطقي',
    icon: 'calculate',
  },
];

export const ACADEMIC_STAGES: AcademicStageOption[] = [
  {
    id: 'early',
    title: 'التأسيس المبكر والابتدائي (٤ - ٩ سنوات)',
    subtitle: 'رياض الأطفال، الصفوف الأولية، تعليم الحروف والقصار',
    icon: 'child_care',
  },
  {
    id: 'middle',
    title: 'الابتدائي المتقدم والمتوسط (١٠ - ١٥ سنة)',
    subtitle: 'إتقان أحكام التجويد، الاستقلالية الدراسية',
    icon: 'school',
  },
  {
    id: 'advanced',
    title: 'حلقات الإجازة والمسابقات القرآنية',
    subtitle: 'الختم بالسند المتصل والإتقان المكثف',
    icon: 'workspace_premium',
  },
];

export const LEARNING_GOALS: LearningGoalOption[] = [
  {
    id: 'hifz',
    title: 'حفظ ومراجعة مع إتقان مخارج الحروف',
    subjectId: 'quran',
  },
  {
    id: 'tajweed_nour',
    title: 'تأسيس القراءة بالتهجئة ونور البيان',
    subjectId: 'quran',
  },
  {
    id: 'fluency',
    title: 'معالجة بطء التلاوة والتعثر النطقي',
    subjectId: 'quran',
  },
  {
    id: 'love_quran',
    title: 'غرس حب القرآن والقصص النبوي',
    subjectId: 'quran',
  },
  {
    id: 'grammar',
    title: 'إتقان القواعد النحوية والإملاء الصحيح',
    subjectId: 'arabic',
  },
  {
    id: 'phonics',
    title: 'تأسيس الصوتيات وطلاقة التحدث بالإنجليزية',
    subjectId: 'english',
  },
];

export const DAYS: DayOption[] = [
  { id: 'sun', name: 'الأحد' },
  { id: 'mon', name: 'الإثنين' },
  { id: 'tue', name: 'الثلاثاء' },
  { id: 'wed', name: 'الأربعاء' },
  { id: 'thu', name: 'الخميس' },
  { id: 'sat', name: 'السبت' },
];

export const BUDGET_TIERS: BudgetTierOption[] = [
  {
    id: 'tier1',
    range: '١٠٠ - ١٤٠ ر.س / ساعة',
    description: 'معلمون متمكنون مع خبرة تفوق ٥ سنوات في تعليم الصغار',
    badge: 'الأكثر اختياراً',
    icon: 'star',
  },
  {
    id: 'tier2',
    range: '٧٠ - ٩٥ ر.س / ساعة',
    description: 'معلمون معتمدون ومتميزون بأسعار اقتصادية مرنة',
    icon: 'savings',
  },
  {
    id: 'tier3',
    range: '١٥٠ - ٢٢٠ ر.س / ساعة',
    description: 'شيوخ مقرئون مجازون بالقراءات العشر ومختصون بتربية الطفل',
    icon: 'military_tech',
  },
];

export const TEACHERS: Teacher[] = [
  {
    id: 'teacher-1',
    name: 'الشيخ عبد الرحمن السبيعي',
    title: 'مجاز بالقراءات العشر • دبلوم تربية الطفل',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    rating: 4.96,
    reviewsCount: 142,
    hourlyRate: 120,
    experienceYears: 7,
    subject: 'quran',
    badges: ['معلم معتمد', 'متخصص صغار', 'إجازة بالسند المتصل'],
    bio: 'أسلوب ممتع وجاذب للأطفال يبني الثقة في النطق السليم وحب الاستماع للقرآن، معتمد من وزارة الشؤون الإسلامية وخبرة في نور البيان وتلقين المبتدئين.',
    audioSampleTitle: 'نموذج تلاوة ترتيلية هادئة (سورة الضحى)',
    audioDuration: '0:45',
    availableDays: ['sun', 'tue', 'thu'],
    availableSlots: ['04:30 م', '05:30 م', '07:00 م', '08:00 م'],
    studentsCount: 38,
    sessionsCompleted: 1240,
  },
  {
    id: 'teacher-2',
    name: 'أ. فاطمة الزهراني',
    title: 'معلمة قرآن كريم وقاعدة نورانية معتمدة',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    rating: 4.98,
    reviewsCount: 189,
    hourlyRate: 110,
    experienceYears: 6,
    subject: 'quran',
    badges: ['معلمة معتمدة', 'صبر وأسلوب تفاعلي', 'نور البيان'],
    bio: 'متخصصة في علاج عسر القراءة والتعثر النطقي لدى أطفال الروضة والمرحلة الابتدائية، بأساليب تحفيزية وبطاقات بصرية مبتكرة.',
    audioSampleTitle: 'شرح تفاعلي لمخرج حرف القاف للأطفال',
    audioDuration: '0:52',
    availableDays: ['sun', 'mon', 'tue', 'wed', 'thu'],
    availableSlots: ['03:30 م', '05:00 م', '06:30 م'],
    studentsCount: 45,
    sessionsCompleted: 1560,
  },
  {
    id: 'teacher-3',
    name: 'الشيخ معاذ الأنصاري',
    title: 'مقرئ بالسند العالي • باحث في البلاغة والتجويد',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    rating: 4.92,
    reviewsCount: 96,
    hourlyRate: 135,
    experienceYears: 9,
    subject: 'quran',
    badges: ['معلم معتمد', 'مسابقات دولية', 'إتقان الأحكام'],
    bio: 'إعداد الطلاب للاختبارات الرسمية وحلقات الإتقان والمسابقات المدرسية والوطنية، مع متابعة دقيقة وملاحظات صوتية موجهة لولي الأمر.',
    audioSampleTitle: 'تطبيق عملي لأحكام المدود مع طالب 8 سنوات',
    audioDuration: '1:10',
    availableDays: ['sun', 'tue', 'thu', 'sat'],
    availableSlots: ['05:00 م', '06:00 م', '07:30 م'],
    studentsCount: 29,
    sessionsCompleted: 980,
  },
];
