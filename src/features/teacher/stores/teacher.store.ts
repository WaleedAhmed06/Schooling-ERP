"use client";
import { create } from "zustand";
import { teacherSeed } from "../data/teacher.seed";
import { teacherService } from "../services/teacher.service";
import type { TeacherData } from "../types/teacher.types";
type TeacherStore = {
  data: TeacherData;
  ready: boolean;
  classId: string;
  date: string;
  hydrate: () => void;
  setClassId: (id: string) => void;
  setDate: (date: string) => void;
  update: (recipe: (prev: TeacherData) => TeacherData) => void;
};
export const useTeacherStore = create<TeacherStore>((set, get) => ({
  data: teacherSeed,
  ready: false,
  classId: "c5a",
  date: new Date().toLocaleDateString("en-CA"),
  hydrate: () => {
    set({ data: teacherService.read(), ready: true });
  },
  setClassId: (classId) => set({ classId }),
  setDate: (date) => set({ date }),
  update: (recipe) => {
    const next = recipe(get().data);
    teacherService.write(next);
    set({ data: next });
  },
}));
