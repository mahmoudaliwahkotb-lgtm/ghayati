import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const faqs = [
    {
      q: 'هل الجلسة التجريبية مجانية فعلاً؟',
      a: 'نعم، الجلسة الاستكشافية مدتها ٢٠ دقيقة مجانية بالكامل ١٠٠٪ بدون أي إلزام بإدخال بطاقة دفع بنكية، هدفها التأكد من راحة طفلك وتوافقه مع المعلم.',
    },
    {
      q: 'كيف يتم اعتماد المعلمين في منصة غايتي؟',
      a: 'يمر كل معلم بفحص دقيق للسيرة الذاتية والإجازات الشرعية، واختبار عملي تربوي لقياس مهارات التعامل مع الصغار والتحفيز الإيجابي وتوصيل المعلومة بسلاسة.',
    },
    {
      q: 'ماذا لو رغبت في تغيير المعلم بعد الجلسة؟',
      a: 'يمكنك تجربة معلم آخر مجاناً حتى تجد المعلم الذي يرتاح له طفلك تماماً.',
    },
    {
      q: 'ما هي الأجهزة والبرامج المطلوبة؟',
      a: 'يكفي أي جهاز هاتف ذكي، أو لوحي (آيباد)، أو كمبيوتر محمول مزود بكاميرا وميكروفون عبر منصة Google Meet أو Zoom.',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto no-scrollbar border border-[#bfc8cd]/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#bfc8cd]/30">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#004357]/10 text-[#004357] flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">support_agent</span>
                </span>
                <h3 className="font-bold text-[16px] text-[#004357]">مركز مساعدة أولياء الأمور</h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full text-[#70787d] hover:bg-[#f3f4f3] flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* FAQs */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#70787d] uppercase tracking-wider">
                الأسئلة الشائعة
              </h4>
              {faqs.map((faq, i) => (
                <div key={i} className="p-3 bg-[#f9f9f8] rounded-xl border border-[#bfc8cd]/25 space-y-1">
                  <p className="text-[13px] font-bold text-[#004357]">{faq.q}</p>
                  <p className="text-[11px] text-[#40484c] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

            {/* Live WhatsApp Support Contact */}
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between gap-3">
              <div>
                <p className="text-[12px] font-bold text-emerald-900">هل تحتاج مساعدة في اختيار المعلم؟</p>
                <p className="text-[10px] text-emerald-700">مستشارونا التربويون متاحون فوراً لخدمتك</p>
              </div>
              <a
                href="https://wa.me/966551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shrink-0"
              >
                محادثة فورية
              </a>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#f3f4f3] hover:bg-[#e8e8e7] text-[#004357] rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              إغلاق
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
