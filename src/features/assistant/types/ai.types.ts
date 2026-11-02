import type { Role } from "@/types/domain";
export type InsightSeverity = "info" | "warning" | "critical";
export interface Insight {
  id: string;
  title: string;
  detail: string;
  severity: InsightSeverity;
  metric?: string;
  source: string;
  action?: string;
}
export interface AiSnapshot {
  role: Role;
  generatedAt: string;
  metrics: Record<string, number>;
  insights: Insight[];
  summary: string;
}
export type AutomationKind =
  "attendance" | "fees" | "assignments" | "results" | "announcement";
export interface AutomationDraft {
  id: string;
  role: Role;
  kind: AutomationKind;
  title: string;
  message: string;
  createdAt: string;
  status: "draft" | "approved";
  audience: string;
  source: string;
}
