"use client";
import { useState, type FormEvent } from "react";
import { useTeacherData } from "../../hooks/useTeacherData";
import type { Assignment } from "../../types/teacher.types";
export function AssignmentForm() {
  const { data, classId, update } = useTeacherData();
  const [error, setError] = useState("");
  const group = data.classes.find((c) => c.id === classId);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const title = String(f.get("title") ?? "").trim();
    const instructions = String(f.get("instructions") ?? "").trim();
    if (!title || !instructions) {
      setError("Title and instructions are required");
      return;
    }
    const item: Assignment = {
      id: crypto.randomUUID(),
      classId,
      subject: group?.subject ?? "",
      title,
      instructions,
      deadline: String(f.get("deadline")),
      marks: Number(f.get("marks")),
      status: "Published",
      fileName: String(f.get("file")) || undefined,
    };
    update((p) => ({ ...p, assignments: [item, ...p.assignments] }));
    setError("");
    form.reset();
  }
  return (
    <form className="teacher-form" onSubmit={submit}>
      <input name="title" placeholder="Assignment title" required />
      <textarea name="instructions" placeholder="Instructions" required />
      <label>
        Deadline <input name="deadline" type="date" required />
      </label>
      <label>
        Total marks{" "}
        <input name="marks" type="number" min="1" defaultValue="20" required />
      </label>
      <input name="file" placeholder="Attachment filename (demo only)" />
      <button type="submit">Publish Assignment</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
