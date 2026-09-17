import React, { useState } from 'react';
import { Teacher, BookingState } from '../types.ts';

interface Step3BookingProps {
  state: BookingState;
  teacher: Teacher;
  onConfirmBooking: (bookingData: {
    childName: string;
    childAge: number;
    parentPhone: string;
    parentNotes: string;
    day: string;
    time: string;
  }) => void;
  onBack: () => void;
}

export const Step3Booking: React.FC<Step3BookingProps> = ({
  teacher,
  onConfirmBooking,
  onBack,
}) => {
  const [childName, setChildName] = useState('عمر');
  const [childAge, setChildAge] = useState(7);
  const [parentPhone, setParentPhone] = useState('0551234567');
  const [parentNotes, setParentNotes] = useState('نحتاج تركيزاً على النطق السليم لمخارج الحروف مع أسلوب تحفيزي مرح.');
  const [selectedDay, setSelectedDay] = useState('اليوم (الخميس)');
  const [selectedTime, setSelectedTime] = useState(teacher.availableSlots[0] || '05:30 م');

  const daysAvailable = [
    { label: 'اليوم (الخميس)', sub: 'أسرع موعد' },
    { label: 'غداً (الجمعة)', sub: 'متاح مساءً' },
    { label: 'السبت القادم', sub: 'متاح عصراً' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim() || !parentPhone.trim()) return;

    onConfirmBooking({
      childName,
      childAge,
      parentPhone,
      parentNotes,
      day: selectedDay,
      time: selectedTime,
    });
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <section className="space-y-1 pt-1">
        <h1 className="text-[24px] font-bold text-[#004357] tracking-tight">
          تأكيد الجلسة التجريبية المجانية (٢٠ دقيقة)
        </h1>
        <p className="text-[13px] text-[#40484c]">
          لقاء تفاعلي فردي ومباشر بين المعلم وطفلك لتقييم المستوى وبناء الألفة التعليمية.
        </p>
      </section>

      {/* Selected Teacher Summary Card */}
      <div className="bg-white rounded-2xl border border-[#bfc8cd]/40 p-3.5 flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <img
            src={teacher.avatar}
            alt={teacher.name}
            referrerPolicy="no-referrer"
            className="w-14 h-14 rounded-xl object-cover border border-[#bfc8cd]/30"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[15px] text-[#004357]">{teacher.name}</span>
              <span className="material-symbols-outlined text-sm text-[#004357]">verified</span>
            </div>
            <p className="text-[11px] text-[#40484c]">{teacher.title}</p>
            <span className="inline-block mt-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
              جلسة أولى مجانية مدتها ٢٠ دقيقة
            </span>
          </div>
        </div>

        <button
          onClick={onBack}
          type="button"
          className="text-xs text-[#004357] underline shrink-0 cursor-pointer font-semibold"
        >
          تغيير المعلم
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Day & Time Selection */}
        <div className="space-y-3">
          <label className="block text-[14px] font-bold text-[#004357]">
            ١. اختر موعد الجلسة التجريبية
          </label>

          <div className="grid grid-cols-3 gap-2">
            {daysAvailable.map((d) => {
              const isSelected = selectedDay === d.label;
              return (
                <button
                  type="button"
                  key={d.label}
                  onClick={() => setSelectedDay(d.label)}
                  className={`p-2.5 rounded-xl text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#004357] text-white shadow-xs font-semibold'
                      : 'bg-white border border-[#bfc8cd]/50 text-[#1a1c1c] hover:border-[#004357]/40'
                  }`}
                >
                  <span className="block text-[12px] font-bold">{d.label}</span>
                  <span
                    className={`block text-[10px] mt-0.5 ${
                      isSelected ? 'text-[#bde9ff]' : 'text-[#70787d]'
                    }`}
                  >
                    {d.sub}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-1">
            <span className="text-[12px] text-[#40484c] font-medium block mb-2">الأوقات المتاحة:</span>
            <div className="flex flex-wrap gap-2">
              {teacher.availableSlots.map((slot) => {
                const isSelected = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#9a442d] text-white shadow-xs'
                        : 'bg-white border border-[#bfc8cd]/50 text-[#1a1c1c] hover:bg-[#f3f4f3]'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Child Details */}
        <div className="space-y-3 pt-2">
          <label className="block text-[14px] font-bold text-[#004357]">
            ٢. بيانات الطفل
          </label>

          <div className="grid grid-cols-3 gap-2.5">
            <div className="col-span-2">
              <label className="block text-[11px] text-[#40484c] mb-1">اسم الطفل *</label>
              <input
                id="child-name-input"
                type="text"
                required
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="مثال: عمر"
                className="w-full h-11 px-3 bg-white border border-[#bfc8cd] rounded-xl text-[13px] text-[#1a1c1c] focus:outline-none focus:ring-2 focus:ring-[#004357]/20 focus:border-[#004357]"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#40484c] mb-1">العمر (سنوات) *</label>
              <input
                id="child-age-input"
                type="number"
                min={3}
                max={18}
                required
                value={childAge}
                onChange={(e) => setChildAge(Number(e.target.value))}
                className="w-full h-11 px-3 bg-white border border-[#bfc8cd] rounded-xl text-[13px] text-[#1a1c1c] text-center focus:outline-none focus:ring-2 focus:ring-[#004357]/20 focus:border-[#004357]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-[#40484c] mb-1">
              ملاحظات يهمك أن يعرفها المعلم عن طفلك
            </label>
            <textarea
              id="child-notes-input"
              rows={2}
              value={parentNotes}
              onChange={(e) => setParentNotes(e.target.value)}
              placeholder="مثال: خجول في البداية، يحب التعزيز، بدأ يحفظ سورة الفاتحة..."
              className="w-full p-3 bg-white border border-[#bfc8cd] rounded-xl text-[12px] text-[#1a1c1c] focus:outline-none focus:ring-2 focus:ring-[#004357]/20 focus:border-[#004357] resize-none"
            ></textarea>
          </div>
        </div>

        {/* Parent Phone for WhatsApp reminder */}
        <div className="space-y-1.5 pt-1">
          <label className="block text-[14px] font-bold text-[#004357]">
            ٣. رقم واتساب ولي الأمر (لإرسال رابط الجلسة) *
          </label>
          <div className="flex items-center gap-2">
            <div className="h-11 px-3 bg-[#f3f4f3] border border-[#bfc8cd] rounded-xl flex items-center justify-center text-[12px] font-bold text-[#004357] shrink-0 dir-ltr">
              🇸🇦 +966
            </div>
            <input
              id="parent-phone-input"
              type="tel"
              required
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
              placeholder="05XXXXXXXX"
              className="w-full h-11 px-3 bg-white border border-[#bfc8cd] rounded-xl text-[13px] text-[#1a1c1c] focus:outline-none focus:ring-2 focus:ring-[#004357]/20 focus:border-[#004357] dir-ltr text-right"
            />
          </div>
          <p className="text-[11px] text-[#70787d]">
            سنرسل لك تذكيرًا قبل الجلسة بـ ١٥ دقيقة مع رابط الدخول للغرفة الافتراضية.
          </p>
        </div>

        {/* Reassurance badge */}
        <div className="p-3 bg-[#bde9ff]/20 rounded-xl border border-[#004357]/15 flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[#004357]">verified_user</span>
          <p className="text-[11px] text-[#004357] font-medium leading-relaxed">
            تأكيد فوري بدون إدخال أي بطاقة دفع بنكية • أول جلسة مجانية بنسبة ١٠٠٪
          </p>
        </div>

        {/* Submit CTA */}
        <div className="pt-2">
          <button
            id="confirm-booking-btn"
            type="submit"
            className="w-full h-12 bg-[#9a442d] hover:bg-[#742814] text-white rounded-xl text-[15px] font-bold transition-all duration-150 active:scale-98 flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>تأكيد موعد الجلسة التجريبية</span>
            <span className="material-symbols-outlined text-lg">check_circle</span>
          </button>
        </div>
      </form>
    </div>
  );
};
