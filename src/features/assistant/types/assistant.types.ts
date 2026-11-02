import type { Role } from "@/types/domain";
export type AssistantRole = Role;
export interface AssistantMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  createdAt: string;
  link?: string;
}
export interface AssistantReply {
  text: string;
  link?: string;
}
