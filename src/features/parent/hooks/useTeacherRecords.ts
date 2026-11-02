"use client";
import { useEffect, useState } from "react";
import { teacherService } from "@/features/teacher/services/teacher.service";
import { teacherSeed } from "@/features/teacher/data/teacher.seed";
import type { TeacherData } from "@/features/teacher/types/teacher.types";
export function useTeacherRecords() {
  const [data, setData] = useState<TeacherData>(teacherSeed);
  useEffect(() => {
    setData(teacherService.read());
    const refresh = () => setData(teacherService.read());
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    window.addEventListener("school-erp:teacher-updated", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("school-erp:teacher-updated", refresh);
    };
  }, []);
  return data;
}
