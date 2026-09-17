/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookingState, Teacher } from './types.ts';
import { TEACHERS } from './data.ts';
import { Header } from './components/Header.tsx';
import { Step1Needs } from './components/Step1Needs.tsx';
import { Step2Teachers } from './components/Step2Teachers.tsx';
import { Step3Booking } from './components/Step3Booking.tsx';
import { Step4Success } from './components/Step4Success.tsx';
import { HelpModal } from './components/HelpModal.tsx';

// Directional slide variants for RTL flow (left is forward, right is backward)
const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? -32 : 32,
    opacity: 0,
    filter: 'blur(4px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? 32 : -32,
    opacity: 0,
    filter: 'blur(4px)',
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [isDesktopView, setIsDesktopView] = useState<boolean>(false);

  const [bookingState, setBookingState] = useState<BookingState>({
    subject: 'quran',
    stage: 'early',
    selectedGoals: ['hifz'],
    selectedDays: ['sun', 'tue', 'thu'],
    budgetTier: 'tier1',
    selectedTeacherId: 'teacher-1',
    childName: 'عمر',
    childAge: 7,
    parentPhone: '0551234567',
    parentNotes: 'نحتاج تركيزاً على النطق السليم لمخارج الحروف مع أسلوب تحفيزي مرح.',
    selectedDay: 'اليوم (الخميس)',
    selectedTime: '05:30 م',
  });

  const selectedTeacher =
    TEACHERS.find((t) => t.id === bookingState.selectedTeacherId) || TEACHERS[0];

  const handleNextStep = () => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTeacher = (teacher: Teacher) => {
    setBookingState((prev) => ({
      ...prev,
      selectedTeacherId: teacher.id,
      selectedTime: teacher.availableSlots[0] || '05:30 م',
    }));
    setDirection(1);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmBooking = (bookingData: {
    childName: string;
    childAge: number;
    parentPhone: string;
    parentNotes: string;
    day: string;
    time: string;
  }) => {
    setBookingState((prev) => ({
      ...prev,
      childName: bookingData.childName,
      childAge: bookingData.childAge,
      parentPhone: bookingData.parentPhone,
      parentNotes: bookingData.parentNotes,
      selectedDay: bookingData.day,
      selectedTime: bookingData.time,
    }));
    setDirection(1);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setDirection(-1);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f9f9f8] text-[#1a1c1c] antialiased flex flex-col justify-start overflow-x-hidden"
    >
      {/* View Wrapper: Either Mobile Container (default matching provided screenshot) or Responsive Wide Canvas */}
      <div
        className={`w-full mx-auto min-h-screen flex flex-col bg-[#f9f9f8] relative transition-all duration-300 ${
          isDesktopView ? 'max-w-4xl px-4 sm:px-6' : 'max-w-md shadow-xl'
        }`}
      >
        {/* Top Header with RTL Back button, Title and Progress indicator */}
        <Header
          currentStep={currentStep}
          onBack={handlePrevStep}
          onOpenHelp={() => setIsHelpOpen(true)}
          isDesktopView={isDesktopView}
          onToggleView={() => setIsDesktopView((prev) => !prev)}
        />

        {/* Dynamic Content Canvas with Smooth Motion Transitions */}
        <main className="flex-1 px-4 pt-3 relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <Step1Needs
                  state={bookingState}
                  onUpdate={setBookingState}
                  onNext={handleNextStep}
                />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <Step2Teachers
                  state={bookingState}
                  onSelectTeacher={handleSelectTeacher}
                  onBack={handlePrevStep}
                />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step-3"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <Step3Booking
                  state={bookingState}
                  teacher={selectedTeacher}
                  onConfirmBooking={handleConfirmBooking}
                  onBack={handlePrevStep}
                />
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step-4"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <Step4Success
                  state={bookingState}
                  teacher={selectedTeacher}
                  onReset={handleReset}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Interactive FAQ & Help Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}
