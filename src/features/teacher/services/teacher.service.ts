import { teacherSeed } from "../data/teacher.seed";
import type { TeacherData } from "../types/teacher.types";
const KEY = "school-erp:teacher:v1";
export interface TeacherRepository {
  read(): TeacherData;
  write(data: TeacherData): void;
  reset(): void;
}
function clone(): TeacherData {
  return JSON.parse(JSON.stringify(teacherSeed)) as TeacherData;
}
export const mockTeacherRepository: TeacherRepository = {
  read() {
    if (typeof window === "undefined") return clone();
    try {
      const saved = localStorage.getItem(KEY);
      return saved ? { ...clone(), ...JSON.parse(saved) } : clone();
    } catch {
      return clone();
    }
  },
  write(data) {
    if (typeof window !== "undefined") {
      localStorage.setItem(KEY, JSON.stringify(data));
      window.dispatchEvent(new Event("school-erp:teacher-updated"));
    }
  },
  reset() {
    if (typeof window !== "undefined") localStorage.removeItem(KEY);
  },
};
export const teacherService: TeacherRepository = mockTeacherRepository;
