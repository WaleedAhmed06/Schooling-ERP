"use client";
import { useEffect, useState } from "react";
import { students } from "@/data/seeds/dashboard";
import { messageRepository } from "@/features/parent/services/message.service";
import type { ParentMessage } from "@/features/parent/types/parent.types";
export function ParentInbox() {
  const [messages, setMessages] = useState<ParentMessage[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const refresh = () => setMessages(messageRepository.list());
  useEffect(() => {
    refresh();
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener("school-erp:parent-updated", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("school-erp:parent-updated", refresh);
    };
  }, []);
  const inbound = messages.filter((m) => m.from === "Parent");
  return (
    <div>
      {inbound.length === 0 && <p>No parent messages yet.</p>}
      {inbound.map((m) => (
        <article className="teacher-record" key={m.id}>
          <strong>
            {students.find((s) => s.id === m.studentId)?.name ?? m.studentId} ·
            Parent message
          </strong>
          <p>{m.body}</p>
          <small>{m.createdAt}</small>
          <form
            className="parent-form"
            onSubmit={(e) => {
              e.preventDefault();
              const body = drafts[m.id]?.trim();
              if (!body) return;
              messageRepository.reply(m.id, body);
              setDrafts((prev) => ({ ...prev, [m.id]: "" }));
              refresh();
            }}
          >
            <textarea
              aria-label={`Reply to ${m.id}`}
              value={drafts[m.id] ?? ""}
              onChange={(e) =>
                setDrafts((prev) => ({ ...prev, [m.id]: e.target.value }))
              }
              placeholder="Reply to parent..."
              required
            />
            <button type="submit">Send Reply</button>
          </form>
        </article>
      ))}
    </div>
  );
}
