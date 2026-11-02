"use client";
import { useState } from "react";
import { useStudentStore } from "../../stores/student.store";
export function AssignmentSubmissionForm({
  assignmentId,
  deadline,
}: {
  assignmentId: string;
  deadline: string;
}) {
  const submit = useStudentStore((s) => s.submitAssignment);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    if (file.size > 1024 * 1024) {
      setMessage("Choose a file smaller than 1 MB for this local demo.");
      return;
    }
    const data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("File read failed"));
      reader.readAsDataURL(file);
    });
    submit(
      assignmentId,
      file.name,
      data,
      new Date() > new Date(`${deadline}T23:59:59`),
    );
    setMessage("Assignment submitted to the teacher's review queue.");
    setFile(null);
  }
  return (
    <form className="lms-form" onSubmit={onSubmit}>
      <label>
        Upload answer (demo, max 1 MB)
        <input
          type="file"
          required
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </label>
      <button type="submit">Submit Assignment</button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}
