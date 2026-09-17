import React, { useState } from 'react';
import { Teacher, BookingState } from '../types.ts';
import { TEACHERS } from '../data.ts';

interface Step2TeachersProps {
  state: BookingState;
  onSelectTeacher: (teacher: Teacher) => void;
  onBack: () => void;
}

export const Step2Teachers: React.FC<Step2TeachersProps> = ({
  onSelectTeacher,
  onBack,
}) => {
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'highest_rated' | 'fastest'>('all');

  const toggleAudio = (teacherId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (playingAudioId === teacherId) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(teacherId);
    }
  };

  const sortedTeachers = [...TEACHERS].sort((a, b) => {
    if (filter === 'highest_rated') return b.rating - a.rating;
    if (filter === 'fastest') return b.experienceYears - a.experienceYears;
    return 0;
  });

  return (
    <div className="space-y-5 pb-8">
      {/* Intro Header */}
      <section className="space-y-2 pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bde9ff] text-[#004357] text-xs font-bold">
          <span className="material-symbols-outlined text-sm">verified</span>
          <span>تطابق بنسبة ٩٨٪ مع متطلباتك</span>
        </div>
        <h1 className="text-[24px] font-bold text-[#004357] tracking-tight">
          اختر المعلم الأنسب لطفلك
        </h1>
        <p className="text-[14px] text-[#40484c] leading-relaxed">
          جميع المعلمين معتمدون واجتازوا المقابلات التربوية، ولديهم خبرة في تحفيز الصغار. الجلسة الأولى مجانية تماماً وبدون أي التزام مالي.
        </p>
      </section>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-[#004357] text-white'
              : 'bg-white border border-[#bfc8cd]/50 text-[#40484c] hover:bg-[#f3f4f3]'
          }`}
        >
          جميع المعلمين (٣)
        </button>
        <button
          onClick={() => setFilter('highest_rated')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            filter === 'highest_rated'
              ? 'bg-[#004357] text-white'
              : 'bg-white border border-[#bfc8cd]/50 text-[#40484c] hover:bg-[#f3f4f3]'
          }`}
        >
          الأعلى تقييماً ★
        </button>
        <button
          onClick={() => setFilter('fastest')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            filter === 'fastest'
              ? 'bg-[#004357] text-white'
              : 'bg-white border border-[#bfc8cd]/50 text-[#40484c] hover:bg-[#f3f4f3]'
          }`}
        >
          الأكثر خبرة
        </button>
      </div>

      {/* Teachers Cards List */}
      <div className="space-y-4">
        {sortedTeachers.map((teacher) => {
          const isPlaying = playingAudioId === teacher.id;

          return (
            <div
              key={teacher.id}
              id={`teacher-card-${teacher.id}`}
              className="bg-white rounded-2xl border border-[#bfc8cd]/40 p-4 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Top Row: Avatar, info, price */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <img
                      src={teacher.avatar}
                      alt={teacher.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover border border-[#bfc8cd]/30"
                    />
                    <span
                      title="متاح أونلاين"
                      className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"
                    ></span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="font-bold text-[16px] text-[#004357]">
                        {teacher.name}
                      </h3>
                      <span className="material-symbols-outlined text-sm text-[#004357]" title="معلم معتمد">
                        verified
                      </span>
                    </div>

                    <p className="text-[12px] text-[#40484c] mt-0.5">{teacher.title}</p>

                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md text-[11px] font-bold border border-amber-200/50">
                        <span className="material-symbols-outlined text-xs text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                        <span>{teacher.rating}</span>
                        <span className="text-amber-700/80 font-normal">({teacher.reviewsCount})</span>
                      </div>

                      <span className="text-[11px] text-[#70787d]">
                        {teacher.experienceYears} سنوات خبرة
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-left shrink-0">
                  <span className="block text-[15px] font-bold text-[#004357]">
                    {teacher.hourlyRate} <span className="text-[11px] font-normal">ر.س/س</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium inline-block mt-0.5">
                    جلسة أولى مجانية
                  </span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {teacher.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium bg-[#f3f4f3] text-[#004357] px-2.5 py-0.5 rounded-full"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Bio summary */}
              <p className="text-[12px] leading-relaxed text-[#40484c] mt-2.5 bg-[#f9f9f8] p-2.5 rounded-xl border border-[#bfc8cd]/20">
                {teacher.bio}
              </p>

              {/* Audio Preview Clip */}
              {teacher.audioSampleTitle && (
                <div className="mt-3 p-2.5 rounded-xl bg-[#bde9ff]/30 border border-[#004357]/15 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={(e) => toggleAudio(teacher.id, e)}
                      aria-label="تشغيل العينة الصوتية"
                      className="w-8 h-8 rounded-full bg-[#004357] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs hover:bg-[#0d5c75] transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isPlaying ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                    <div>
                      <p className="text-[11px] font-bold text-[#004357]">
                        {isPlaying ? 'جاري الاستماع للنموذج الصوتي...' : teacher.audioSampleTitle}
                      </p>
                      <p className="text-[10px] text-[#70787d]">
                        مدة العينة: {teacher.audioDuration} • تلاوة وشرح ممتع
                      </p>
                    </div>
                  </div>

                  {/* Soundwave animation */}
                  <div className="flex items-end gap-1 h-5 px-2">
                    {[40, 75, 55, 90, 60, 80].map((h, i) => (
                      <span
                        key={i}
                        className={`w-1 bg-[#004357] rounded-full transition-all ${
                          isPlaying ? 'animate-pulse' : 'opacity-40'
                        }`}
                        style={{ height: isPlaying ? `${h}%` : '35%' }}
                      ></span>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Times & Action Button */}
              <div className="mt-4 pt-3 border-t border-[#bfc8cd]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-right w-full sm:w-auto">
                  <span className="text-[11px] text-[#70787d] block">أقرب موعد متاح للتجربة:</span>
                  <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#004357] mt-0.5">
                    <span className="material-symbols-outlined text-sm text-[#9a442d]">
                      schedule
                    </span>
                    <span>اليوم، {teacher.availableSlots[0]} (٢٠ دقيقة)</span>
                  </div>
                </div>

                <button
                  id={`book-teacher-${teacher.id}`}
                  onClick={() => onSelectTeacher(teacher)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#9a442d] hover:bg-[#742814] text-white rounded-xl text-[13px] font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                >
                  <span>حجز الجلسة المجانية</span>
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Back button link */}
      <div className="text-center pt-2">
        <button
          onClick={onBack}
          className="text-xs text-[#004357] hover:underline font-semibold cursor-pointer"
        >
          ← تعديل معايير البحث والجدول
        </button>
      </div>
    </div>
  );
};
