export interface Lesson {
  id: string;
  subject: string;
  chapter: string;
  title: string;
  description: string;
  notes: string;
  videoUrl?: string;
  resources: string[];
}
export interface QuizQuestion {
  id: string;
  prompt: string;
  kind: "mcq" | "boolean";
  options: string[];
  correct: number;
}
export interface Quiz {
  id: string;
  subject: string;
  title: string;
  durationSeconds: number;
  questions: QuizQuestion[];
}
export interface QuizAttempt {
  quizId: string;
  studentId: string;
  answers: Record<string, number>;
  score: number;
  total: number;
  submittedAt: string;
}
export interface StudentSubmission {
  assignmentId: string;
  studentId: string;
  fileName: string;
  submittedAt: string;
  status: "Submitted" | "Under Review" | "Graded" | "Late";
  fileData?: string;
}
export interface StudentProgress {
  completedLessonIds: string[];
  attempts: QuizAttempt[];
  submissions: StudentSubmission[];
}
