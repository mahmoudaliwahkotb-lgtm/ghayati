import React from 'react';
import {
  SubjectId,
  AcademicStageId,
  LearningGoalId,
  DayId,
  BudgetTierId,
  BookingState,
} from '../types.ts';
import {
  SUBJECTS,
  ACADEMIC_STAGES,
  LEARNING_GOALS,
  DAYS,
  BUDGET_TIERS,
} from '../data.ts';

interface Step1NeedsProps {
  state: BookingState;
  onUpdate: (updater: (prev: BookingState) => BookingState) => void;
  onNext: () => void;
}

export const Step1Needs: React.FC<Step1NeedsProps> = ({
  state,
  onUpdate,
  onNext,
}) => {
  const handleSelectSubject = (subjectId: SubjectId) => {
    onUpdate((prev) => ({ ...prev, subject: subjectId }));
  };

  const handleSelectStage = (stageId: AcademicStageId) => {
    onUpdate((prev) => ({ ...prev, stage: stageId }));
  };

  const handleToggleGoal = (goalId: LearningGoalId) => {
    onUpdate((prev) => {
      const exists = prev.selectedGoals.includes(goalId);
      return {
        ...prev,
        selectedGoals: exists
          ? prev.selectedGoals.filter((g) => g !== goalId)
          : [...prev.selectedGoals, goalId],
      };
    });
  };

  const handleToggleDay = (dayId: DayId) => {
    onUpdate((prev) => {
      const exists = prev.selectedDays.includes(dayId);
      const newDays = exists
        ? prev.selectedDays.filter((d) => d !== dayId)
        : [...prev.selectedDays, dayId];
      // Keep at least one day
      return {
        ...prev,
        selectedDays: newDays.length === 0 ? [dayId] : newDays,
      };
    });
  };

  const handleSelectBudget = (tierId: BudgetTierId) => {
    onUpdate((prev) => ({ ...prev, budgetTier: tierId }));
  };

  return (
    <div className="space-y-6 pb-4">
      {/* Emotional Value Prop Headline Banner */}
      <section className="space-y-1.5 pt-1">
        <h1 className="text-[26px] leading-[36px] font-bold text-[#004357] tracking-tight">
          دعنا نساعدك في اختيار المعلم الأنسب لطفلك
        </h1>
        <p className="text-[14px] leading-[22px] text-[#40484c]">
          نخبة من خيرة المعلمين التربويين المعتمدين لمرافقة رحلة ابنك بكل مودة وإتقان راسخ.
        </p>
      </section>

      {/* Step 1: Subject Selection (2x2 Bento Grid) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-[#004357] flex items-center gap-1.5">
            <span>١. المادة التعليمية</span>
            <span className="text-[#ba1a1a] font-bold text-sm">*</span>
          </h2>
          <span className="text-[11px] font-medium text-[#70787d]">اختر مادة واحدة</span>
        </div>

        <div className="grid grid-cols-2 gap-3" role="radiogroup">
          {SUBJECTS.map((sub) => {
            const isSelected = state.subject === sub.id;
            return (
              <div
                key={sub.id}
                id={`subject-${sub.id}`}
                onClick={() => handleSelectSubject(sub.id)}
                className={`relative rounded-xl p-3.5 shadow-sm cursor-pointer transition-all duration-200 active:scale-98 flex flex-col justify-between text-right ${
                  isSelected
                    ? 'bg-white border-2 border-[#0d5c75] ring-2 ring-[#0d5c75]/10'
                    : 'bg-white border border-[#bfc8cd]/40 hover:border-[#004357]/40'
                }`}
              >
                {sub.isPopular && (
                  <div className="absolute -top-2.5 left-2.5 bg-[#9a442d] text-white px-2 py-0.5 rounded-full text-[11px] font-bold shadow-xs flex items-center gap-0.5">
                    <span>الأعلى طلباً</span>
                  </div>
                )}
                <div>
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                      isSelected
                        ? 'bg-[#bde9ff] text-[#004357]'
                        : 'bg-[#f3f4f3] text-[#40484c]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={isSelected ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {sub.icon}
                    </span>
                  </div>
                  <p
                    className={`text-[15px] mb-0.5 ${
                      isSelected
                        ? 'text-[#004357] font-bold'
                        : 'text-[#1a1c1c] font-semibold'
                    }`}
                  >
                    {sub.title}
                  </p>
                  <p className="text-[12px] text-[#40484c] leading-relaxed">
                    {sub.subtitle}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#bfc8cd]/30 flex items-center justify-between">
                  <span
                    className={`text-[12px] font-semibold ${
                      isSelected ? 'text-[#004357]' : 'text-[#70787d]'
                    }`}
                  >
                    {isSelected ? 'مُختار' : 'تحديد'}
                  </span>
                  {isSelected ? (
                    <span className="w-5 h-5 rounded-full bg-[#0d5c75] text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </span>
                  ) : (
                    <span className="w-5 h-5 rounded-full border border-[#bfc8cd]"></span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Step 2: Child's Academic Stage */}
      <section className="space-y-3">
        <h2 className="text-[20px] font-bold text-[#004357] flex items-center gap-1.5">
          <span>٢. المرحلة الدراسية للطفل</span>
          <span className="text-[#ba1a1a] font-bold text-sm">*</span>
        </h2>
        <div className="flex flex-col gap-2.5">
          {ACADEMIC_STAGES.map((stage) => {
            const isSelected = state.stage === stage.id;
            return (
              <label
                key={stage.id}
                id={`stage-${stage.id}`}
                onClick={() => handleSelectStage(stage.id)}
                className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? 'border-2 border-[#0d5c75] bg-white shadow-xs'
                    : 'border border-[#bfc8cd]/40 bg-white hover:border-[#004357]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-[#bde9ff] text-[#004357]'
                        : 'bg-[#f3f4f3] text-[#40484c]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">{stage.icon}</span>
                  </div>
                  <div>
                    <p
                      className={`text-[14px] ${
                        isSelected
                          ? 'text-[#004357] font-bold'
                          : 'text-[#1a1c1c] font-semibold'
                      }`}
                    >
                      {stage.title}
                    </p>
                    <p className="text-[12px] text-[#40484c]">{stage.subtitle}</p>
                  </div>
                </div>
                {isSelected ? (
                  <span className="w-5 h-5 rounded-full bg-[#004357] flex items-center justify-center text-white shrink-0">
                    <span className="material-symbols-outlined text-sm">check</span>
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full border border-[#bfc8cd] shrink-0"></span>
                )}
              </label>
            );
          })}
        </div>
      </section>

      {/* Step 3: Main Learning Goal (Chips) */}
      <section className="space-y-3">
        <h2 className="text-[20px] font-bold text-[#004357] flex items-center gap-1.5">
          <span>٣. الهدف الأساسي من الجلسات</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {LEARNING_GOALS.map((goal) => {
            const isSelected = state.selectedGoals.includes(goal.id);
            return (
              <button
                key={goal.id}
                id={`goal-${goal.id}`}
                onClick={() => handleToggleGoal(goal.id)}
                className={`px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#004357] text-white shadow-xs font-semibold'
                    : 'bg-white border border-[#bfc8cd]/50 text-[#1a1c1c] hover:bg-[#f3f4f3]'
                }`}
                type="button"
              >
                {isSelected && (
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                )}
                <span>{goal.title}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 4: Preferred Days (Horizontal Scroll Pills) */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-[#004357]">
            ٤. الأيام المناسبة لجدول الطفل
          </h2>
          <span className="text-[11px] font-medium text-[#70787d]">متعدد الخيارات</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
          {DAYS.map((d) => {
            const isSelected = state.selectedDays.includes(d.id);
            return (
              <button
                key={d.id}
                id={`day-${d.id}`}
                onClick={() => handleToggleDay(d.id)}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-[13px] font-bold flex flex-col items-center min-w-[64px] transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#bde9ff] text-[#001f2a] border border-[#004357]/20 shadow-xs'
                    : 'bg-white border border-[#bfc8cd]/50 text-[#1a1c1c] hover:border-[#004357]/40'
                }`}
                type="button"
              >
                <span>{d.name}</span>
                <span
                  className={`text-[10px] mt-0.5 ${
                    isSelected ? 'text-[#004357] font-semibold' : 'text-[#70787d]'
                  }`}
                >
                  {isSelected ? 'مختار' : 'متاح'}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 5: Hourly Budget Range */}
      <section className="space-y-3">
        <h2 className="text-[20px] font-bold text-[#004357] flex items-center justify-between">
          <span>٥. الميزانية المفضلة للجلسة (ساعة)</span>
        </h2>
        <div className="grid grid-cols-1 gap-2.5">
          {BUDGET_TIERS.map((tier) => {
            const isSelected = state.budgetTier === tier.id;
            return (
              <label
                key={tier.id}
                id={`budget-${tier.id}`}
                onClick={() => handleSelectBudget(tier.id)}
                className={`p-3.5 rounded-xl flex items-center justify-between cursor-pointer relative shadow-sm transition-all duration-150 ${
                  isSelected
                    ? 'border-2 border-[#0d5c75] bg-white ring-2 ring-[#0d5c75]/5'
                    : 'border border-[#bfc8cd]/40 bg-white hover:border-[#004357]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      tier.badge
                        ? 'bg-[#ffdbd2] text-[#742814]'
                        : 'bg-[#f3f4f3] text-[#40484c]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      style={tier.badge ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {tier.icon}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[14px] ${
                          isSelected
                            ? 'font-bold text-[#004357]'
                            : 'font-semibold text-[#1a1c1c]'
                        }`}
                      >
                        {tier.range}
                      </span>
                      {tier.badge && (
                        <span className="bg-[#9a442d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {tier.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#40484c]">{tier.description}</p>
                  </div>
                </div>
                {isSelected ? (
                  <span className="w-5 h-5 rounded-full bg-[#004357] flex items-center justify-center text-white shrink-0">
                    <span className="material-symbols-outlined text-sm">check</span>
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full border border-[#bfc8cd] shrink-0"></span>
                )}
              </label>
            );
          })}
        </div>
      </section>

      {/* Trust Assurance Mini Card (Parent Peace of Mind) */}
      <section className="bg-[#f3f4f3] border border-[#bfc8cd]/40 rounded-xl p-3.5 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-[#004357]/10 text-[#004357] flex items-center justify-center shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-lg">security</span>
        </div>
        <div>
          <p className="text-[13px] text-[#004357] font-bold mb-0.5">ضمان غايتي التربوي</p>
          <p className="text-[12px] text-[#40484c] leading-relaxed">
            جميع المعلمين اجتازوا فحص السيرة الذاتية واختبار المقدرة التربوية والشرعية. أول جلسة تجريبية مدتها ٢٠ دقيقة مجاناً للتأكد من راحة طفلك التامة.
          </p>
        </div>
      </section>

      {/* Sticky Bottom Conversion Dock Spacer */}
      <div className="h-20"></div>

      {/* Sticky Bottom Conversion Dock */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#f9f9f8]/95 backdrop-blur-md shadow-lg border-t border-[#bfc8cd]/30 p-4">
        <div className="max-w-md mx-auto space-y-2">
          {/* Primary Action Button: Warm Coral / Conversion Accent */}
          <button
            id="proceed-to-teachers"
            onClick={onNext}
            className="w-full h-12 bg-[#9a442d] hover:bg-[#742814] text-white rounded-xl text-[15px] font-bold transition-all duration-150 active:scale-98 flex items-center justify-center gap-2 shadow-md cursor-pointer"
            type="button"
          >
            <span>عرض المعلمين الموصى بهم لطفلك (٣ متاحون الآن)</span>
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </button>

          {/* Subtext reassurance */}
          <div className="flex items-center justify-center gap-1.5 text-center">
            <span className="material-symbols-outlined text-sm text-[#004357]">lock</span>
            <span className="text-[11px] font-medium text-[#40484c]">
              بياناتكم في أمان تام • بدون اشتراك مسبق
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
