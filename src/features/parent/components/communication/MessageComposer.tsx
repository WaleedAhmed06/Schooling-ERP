"use client";
import { useState } from "react";
import { useParentStore } from "../../stores/parent.store";
export function MessageComposer({ studentId }: { studentId: string }) {
  const [body, setBody] = useState("");
  const sendMessage = useParentStore((s) => s.sendMessage);
  return (
    <form
      className="parent-form"
      onSubmit={(e) => {
        e.preventDefault();
        const message = body.trim();
        if (!message) return;
        sendMessage(studentId, "Class Teacher", message);
        setBody("");
      }}
    >
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        placeholder="Write a message to your child's teacher…"
      />
      <button type="submit">Send Message</button>
    </form>
  );
}
