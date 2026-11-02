import type { Role } from "@/types/domain";
import type { AutomationDraft, AutomationKind } from "../types/ai.types";
import { getAiSnapshot } from "./analytics.service";
const key = (role: Role) => `school-erp:ai-automation:${role}:v1`;
const kinds: Record<Role, AutomationKind[]> = {
  admin: ["fees", "attendance", "announcement"],
  teacher: ["assignments", "attendance", "results"],
  parent: ["fees", "announcement"],
  student: ["assignments", "results"],
};
export function allowedAutomationKinds(role: Role) {
  return kinds[role];
}
export function loadDrafts(role: Role): AutomationDraft[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(key(role)) ?? "[]");
    return Array.isArray(parsed)
      ? parsed.filter((d: AutomationDraft) => d.role === role)
      : [];
  } catch {
    return [];
  }
}
function save(role: Role, drafts: AutomationDraft[]) {
  localStorage.setItem(key(role), JSON.stringify(drafts.slice(0, 30)));
  window.dispatchEvent(new Event("school-erp:ai-drafts-updated"));
}
export function createAutomationDraft(
  role: Role,
  kind: AutomationKind,
): AutomationDraft {
  if (!kinds[role].includes(kind))
    throw new Error("Automation is not permitted for this role.");
  const snapshot = getAiSnapshot(role);
  const insight = snapshot.insights.find((i) => i.id === kind);
  const title = {
    attendance: "Attendance follow-up",
    fees: "Fee reminder",
    assignments: "Assignment reminder",
    results: "Result update",
    announcement: "School announcement",
  }[kind];
  const audience =
    role === "admin"
      ? "School administration review"
      : role === "teacher"
        ? "Assigned class review"
        : role === "parent"
          ? "Personal reminder"
          : "Personal study reminder";
  const message = insight
    ? `${title}: ${insight.detail} Please review the records before taking any action.`
    : `${title}: Review current school records and prepare a suitable notice. No message has been sent.`;
  const draft: AutomationDraft = {
    id: `draft-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role,
    kind,
    title,
    message,
    createdAt: new Date().toISOString(),
    status: "draft",
    audience,
    source: insight?.source ?? "Manual template",
  };
  save(role, [draft, ...loadDrafts(role)]);
  return draft;
}
export function updateDraft(
  role: Role,
  id: string,
  patch: { message?: string; status?: "approved" },
): AutomationDraft[] {
  const drafts = loadDrafts(role).map((d) =>
    d.id === id ? { ...d, ...patch, status: patch.status ?? d.status } : d,
  );
  save(role, drafts);
  return drafts;
}
export function removeDraft(role: Role, id: string) {
  const drafts = loadDrafts(role).filter((d) => d.id !== id);
  save(role, drafts);
  return drafts;
}
/** Approval is a local demo audit state, not dispatch. No notifications, payments, or records are mutated. */
