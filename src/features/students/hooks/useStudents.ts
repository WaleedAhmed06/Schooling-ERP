"use client";
import { useCallback, useEffect, useState } from "react";
import { studentService } from "../services/student.service";
import type { Student, StudentInput } from "../types/student.types";
export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const refresh = useCallback(async () => {
    try {
      setStudents(await studentService.list());
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load students");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void refresh();
  }, [refresh]);
  async function mutate(action: () => Promise<unknown>) {
    try {
      setError("");
      await action();
      await refresh();
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Operation failed");
      return false;
    }
  }
  return {
    students,
    loading,
    error,
    refresh,
    create: (data: StudentInput) => mutate(() => studentService.create(data)),
    update: (id: string, data: StudentInput) =>
      mutate(() => studentService.update(id, data)),
    remove: (id: string) => mutate(() => studentService.remove(id)),
  };
}
