"use client";
import { useEffect } from "react";
import { useTeacherStore } from "../stores/teacher.store";
export function useTeacherData() {
  const hydrate = useTeacherStore((s) => s.hydrate);
  useEffect(() => {
    hydrate();
    window.addEventListener("focus", hydrate);
    window.addEventListener("storage", hydrate);
    window.addEventListener("school-erp:teacher-updated", hydrate);
    return () => {
      window.removeEventListener("focus", hydrate);
      window.removeEventListener("storage", hydrate);
      window.removeEventListener("school-erp:teacher-updated", hydrate);
    };
  }, [hydrate]);
  return {
    data: useTeacherStore((s) => s.data),
    ready: useTeacherStore((s) => s.ready),
    update: useTeacherStore((s) => s.update),
    classId: useTeacherStore((s) => s.classId),
    setClassId: useTeacherStore((s) => s.setClassId),
    date: useTeacherStore((s) => s.date),
    setDate: useTeacherStore((s) => s.setDate),
  };
}
