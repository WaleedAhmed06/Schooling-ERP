"use client";
import { useEffect, useState } from "react";
import { students } from "@/data/seeds/dashboard";
import { teacherService } from "@/features/teacher/services/teacher.service";
import type { TeacherData } from "@/features/teacher/types/teacher.types";
import { useStudentStore } from "../stores/student.store";
export function useStudentPortal() {
  const initialize = useStudentStore((s) => s.initialize);
  useEffect(() => initialize("s1"), [initialize]);
  const state = useStudentStore();
  const [teacher, setTeacher] = useState<TeacherData>(() =>
    teacherService.read(),
  );
  useEffect(() => {
    const refresh = () => setTeacher(teacherService.read());
    refresh();
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener("school-erp:teacher-updated", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("school-erp:teacher-updated", refresh);
    };
  }, []);
  const student = students.find((s) => s.id === state.studentId) ?? students[0];
  const classIds = teacher.classes
    .filter((c) => c.studentIds.includes(student.id))
    .map((c) => c.id);
  return { ...state, student, teacher, classIds };
}
