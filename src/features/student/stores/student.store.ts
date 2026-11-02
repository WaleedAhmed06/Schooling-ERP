"use client";
import { create } from "zustand";
import { studentRepository } from "../services/student.service";
import { teacherService } from "@/features/teacher/services/teacher.service";
import type {
  StudentProgress,
  QuizAttempt,
  StudentSubmission,
} from "../types/student.types";
type State = {
  studentId: string;
  hydrated: boolean;
  progress: StudentProgress;
  initialize: (id: string) => void;
  completeLesson: (id: string) => void;
  submitQuiz: (attempt: QuizAttempt) => void;
  submitAssignment: (
    assignmentId: string,
    fileName: string,
    fileData?: string,
    late?: boolean,
  ) => void;
};
const empty = (): StudentProgress => ({
  completedLessonIds: [],
  attempts: [],
  submissions: [],
});
export const useStudentStore = create<State>((set, get) => ({
  studentId: "s1",
  hydrated: false,
  progress: empty(),
  initialize: (id) => {
    if (get().hydrated && get().studentId === id) return;
    set({
      studentId: id,
      hydrated: true,
      progress: studentRepository.load(id),
    });
  },
  completeLesson: (id) => {
    const s = get();
    if (s.progress.completedLessonIds.includes(id)) return;
    const progress = {
      ...s.progress,
      completedLessonIds: [...s.progress.completedLessonIds, id],
    };
    studentRepository.save(s.studentId, progress);
    set({ progress });
  },
  submitQuiz: (attempt) => {
    const s = get();
    const progress = {
      ...s.progress,
      attempts: [attempt, ...s.progress.attempts],
    };
    studentRepository.save(s.studentId, progress);
    set({ progress });
  },
  submitAssignment: (assignmentId, fileName, fileData, late = false) => {
    const s = get();
    const submission: StudentSubmission = {
      assignmentId,
      studentId: s.studentId,
      fileName,
      fileData,
      submittedAt: new Date().toISOString(),
      status: late ? "Late" : "Submitted",
    };
    const progress = {
      ...s.progress,
      submissions: [
        submission,
        ...s.progress.submissions.filter(
          (x) => x.assignmentId !== assignmentId,
        ),
      ],
    };
    studentRepository.save(s.studentId, progress);
    set({ progress });
    const teacher = teacherService.read();
    const previous = teacher.submissions.find(
      (x) => x.assignmentId === assignmentId && x.studentId === s.studentId,
    );
    teacher.submissions = [
      ...teacher.submissions.filter(
        (x) =>
          !(x.assignmentId === assignmentId && x.studentId === s.studentId),
      ),
      {
        id: previous?.id ?? `sub-${Date.now()}`,
        assignmentId,
        studentId: s.studentId,
        fileName,
        submittedAt: submission.submittedAt,
        reviewed: false,
      },
    ];
    teacherService.write(teacher);
    if (typeof window !== "undefined")
      window.dispatchEvent(new Event("school-erp:teacher-updated"));
  },
}));
