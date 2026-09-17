import React from 'react';
import { motion } from 'motion/react';

interface HeaderProps {
  currentStep: number;
  onBack: () => void;
  onOpenHelp: () => void;
  isDesktopView: boolean;
  onToggleView: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onBack,
  onOpenHelp,
  isDesktopView,
  onToggleView,
}) => {
  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'الخطوة ١ من ٣: تحديد الاحتياج';
      case 2:
        return 'الخطوة ٢ من ٣: اختيار المعلم الأنسب';
      case 3:
        return 'الخطوة ٣ من ٣: تأكيد الجلسة التجريبية';
      case 4:
        return 'رحلة التعلّم وموعد الجلسة';
      default:
        return 'تحديد الاحتياج';
    }
  };

  const getStepProgressPercent = () => {
    switch (currentStep) {
      case 1:
        return 33.33;
      case 2:
        return 66.66;
      case 3:
        return 100;
      case 4:
        return 100;
      default:
        return 33.33;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#f9f9f8]/95 backdrop-blur-md border-b border-[#bfc8cd]/20">
      <div className="flex items-center justify-between px-4 py-2.5 w-full max-w-screen-md mx-auto">
        {/* Leading Back Action (RTL: Arrow points right to go back) */}
        <div className="flex items-center gap-1">
          {currentStep > 1 && (
            <button
              id="back-button"
              onClick={onBack}
              aria-label="الرجوع"
              className="p-2 rounded-xl text-[#004357] hover:bg-[#eeeeed] transition-colors duration-200 active:scale-95 flex items-center justify-center cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-2xl">arrow_forward</span>
            </button>
          )}

          {/* Brand Logo / Headline */}
          <div className="flex items-center gap-2 pr-1">
            <span className="font-bold text-2xl text-[#004357] tracking-tight">غايتي</span>
            <span className="w-2 h-2 rounded-full bg-[#9a442d]"></span>
          </div>
        </div>

        {/* Action Controls: View mode toggle & Help Icon */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleView}
            title={isDesktopView ? 'التبديل إلى مقاس الجوال' : 'التبديل إلى العرض الواسع'}
            className="text-xs px-2.5 py-1 rounded-lg bg-[#eeeeed] text-[#40484c] hover:bg-[#e2e2e2] transition-colors flex items-center gap-1 cursor-pointer font-medium"
          >
            <span className="material-symbols-outlined text-base">
              {isDesktopView ? 'smartphone' : 'devices'}
            </span>
            <span className="hidden sm:inline">
              {isDesktopView ? 'شاشة جوال' : 'عرض واسع'}
            </span>
          </button>

          <button
            id="help-button"
            onClick={onOpenHelp}
            aria-label="المساعدة والدعم"
            className="p-2 rounded-xl text-[#40484c] hover:bg-[#eeeeed] transition-colors duration-200 active:scale-95 flex items-center justify-center cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-2xl">help_outline</span>
          </button>
        </div>
      </div>

      {/* Linear Step Progress Header with smooth animation */}
      {currentStep <= 3 && (
        <div className="px-4 pb-3 max-w-screen-md mx-auto">
          <div className="flex items-center justify-between text-xs text-[#004357] mb-1.5">
            <span className="font-bold flex items-center gap-1.5 text-[13px]">
              <span className="w-2 h-2 rounded-full bg-[#9a442d] inline-block animate-pulse"></span>
              {getStepTitle()}
            </span>
            <span className="text-[#70787d]">
              {currentStep === 1 ? 'متبقي دقيقة واحدة' : currentStep === 2 ? 'متبقي خطوة أخيرة' : 'الخطوة الختامية'}
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#e8e8e7] rounded-full overflow-hidden flex">
            <motion.div
              initial={false}
              animate={{
                width: `${getStepProgressPercent()}%`,
                backgroundColor: currentStep === 3 ? '#0d5c75' : '#004357',
              }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="h-full rounded-full"
            />
          </div>
        </div>
      )}
    </header>
  );
};
