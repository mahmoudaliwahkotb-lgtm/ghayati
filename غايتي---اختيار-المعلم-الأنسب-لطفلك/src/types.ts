export type SubjectId = 'quran' | 'arabic' | 'english' | 'math';

export interface SubjectOption {
  id: SubjectId;
  title: string;
  subtitle: string;
  icon: string;
  isPopular?: boolean;
}

export type AcademicStageId = 'early' | 'middle' | 'advanced';

export interface AcademicStageOption {
  id: AcademicStageId;
  title: string;
  subtitle: string;
  icon: string;
}

export type LearningGoalId = 'hifz' | 'tajweed_nour' | 'fluency' | 'love_quran' | 'grammar' | 'phonics';

export interface LearningGoalOption {
  id: LearningGoalId;
  title: string;
  subjectId: SubjectId;
}

export type DayId = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'sat';

export interface DayOption {
  id: DayId;
  name: string;
}

export type BudgetTierId = 'tier1' | 'tier2' | 'tier3';

export interface BudgetTierOption {
  id: BudgetTierId;
  range: string;
  description: string;
  badge?: string;
  icon: string;
}

export interface Teacher {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  experienceYears: number;
  subject: SubjectId;
  badges: string[];
  bio: string;
  audioSampleTitle?: string;
  audioDuration?: string;
  availableDays: DayId[];
  availableSlots: string[];
  studentsCount: number;
  sessionsCompleted: number;
}

export interface BookingState {
  subject: SubjectId;
  stage: AcademicStageId;
  selectedGoals: LearningGoalId[];
  selectedDays: DayId[];
  budgetTier: BudgetTierId;
  selectedTeacherId?: string;
  selectedDay?: string;
  selectedTime?: string;
  childName?: string;
  childAge?: number;
  parentPhone?: string;
  parentNotes?: string;
}
