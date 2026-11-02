import type { StudentProgress } from "../types/student.types";
export interface StudentRepository {
  load(studentId: string): StudentProgress;
  save(studentId: string, data: StudentProgress): void;
}
const empty = (): StudentProgress => ({
  completedLessonIds: [],
  attempts: [],
  submissions: [],
});
const key = (id: string) => `school-erp:student:${id}:v1`;
export const studentRepository: StudentRepository = {
  load(id) {
    if (typeof window === "undefined") return empty();
    try {
      const data = localStorage.getItem(key(id));
      return data ? (JSON.parse(data) as StudentProgress) : empty();
    } catch {
      return empty();
    }
  },
  save(id, data) {
    if (typeof window !== "undefined")
      localStorage.setItem(key(id), JSON.stringify(data));
  },
};
