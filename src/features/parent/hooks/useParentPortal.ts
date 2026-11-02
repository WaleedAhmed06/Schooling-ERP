"use client";
import { useEffect } from "react";
import { students } from "@/data/seeds/dashboard";
import { useParentStore } from "../stores/parent.store";
export function useParentPortal() {
  const initialize = useParentStore((s) => s.initialize);
  useEffect(() => {
    initialize();
    const refresh = () => initialize();
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener("school-erp:parent-updated", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("school-erp:parent-updated", refresh);
    };
  }, [initialize]);
  const store = useParentStore();
  const children = students.filter((s) => s.parentId === "p1");
  const child =
    children.find((c) => c.id === store.selectedChildId) ?? children[0];
  return { ...store, children, child };
}
