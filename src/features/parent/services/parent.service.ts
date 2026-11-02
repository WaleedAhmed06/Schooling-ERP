import { parentSeed } from "../data/parent.seed";
import type { ParentData } from "../types/parent.types";
export interface ParentRepository {
  load(): ParentData;
  save(data: ParentData): void;
}
const key = "school-erp:parent:v1";
const initial = () => structuredClone(parentSeed);
export const parentRepository: ParentRepository = {
  load() {
    if (typeof window === "undefined") return initial();
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as ParentData) : initial();
    } catch {
      return initial();
    }
  },
  save(data) {
    if (typeof window !== "undefined")
      localStorage.setItem(key, JSON.stringify(data));
  },
};
