"use client";
import { modules } from "./module-config";
export type RecordRow = Record<string, string> & { id: string };
const KEY = "school-erp-phase2-v1:";
export function getRows(module: string): RecordRow[] {
  if (typeof window === "undefined") return [];
  const seed = modules[module]?.seed ?? [];
  try {
    const raw = localStorage.getItem(KEY + module);
    if (raw) return JSON.parse(raw) as RecordRow[];
  } catch {}
  return seed.map((row, i) => ({ ...row, id: `${module}-${i + 1}` }));
}
export function setRows(module: string, rows: RecordRow[]) {
  localStorage.setItem(KEY + module, JSON.stringify(rows));
  window.dispatchEvent(new CustomEvent("erp-data-changed", { detail: module }));
}
export function downloadCSV(rows: RecordRow[], name: string) {
  const cols = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
  const escape = (v: string) => `"${String(v ?? "").replaceAll('"', '""')}"`;
  const csv = [
    cols.join(","),
    ...rows.map((row) => cols.map((col) => escape(row[col])).join(",")),
  ].join("\r\n");
  const url = URL.createObjectURL(
    new Blob([csv], { type: "text/csv;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
