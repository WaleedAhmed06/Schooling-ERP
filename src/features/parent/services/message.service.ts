import type { ParentMessage } from "../types/parent.types";
import { parentRepository } from "./parent.service";
export interface MessageRepository {
  list(): ParentMessage[];
  reply(messageId: string, body: string): void;
}
export const messageRepository: MessageRepository = {
  list: () => parentRepository.load().messages,
  reply: (messageId, body) => {
    const data = parentRepository.load();
    const original = data.messages.find((m) => m.id === messageId);
    if (!original || !body.trim()) return;
    data.messages.unshift({
      id: `reply-${Date.now()}`,
      studentId: original.studentId,
      to: "Parent",
      body: body.trim(),
      from: "Teacher",
      createdAt: new Date().toISOString(),
    });
    parentRepository.save(data);
    if (typeof window !== "undefined")
      window.dispatchEvent(new Event("school-erp:parent-updated"));
  },
};
