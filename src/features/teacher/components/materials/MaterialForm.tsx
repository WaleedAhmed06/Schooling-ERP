"use client";
import { useTeacherData } from "../../hooks/useTeacherData";
import type { Material } from "../../types/teacher.types";
export function MaterialForm() {
  const { data, classId, update } = useTeacherData();
  const group = data.classes.find((c) => c.id === classId);
  return (
    <form
      className="teacher-form"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const f = new FormData(form);
        const material: Material = {
          id: crypto.randomUUID(),
          classId,
          subject: group?.subject ?? "",
          title: String(f.get("title")),
          kind: String(f.get("kind")) as Material["kind"],
          fileName: String(f.get("file")),
        };
        update((p) => ({ ...p, materials: [material, ...p.materials] }));
        form.reset();
      }}
    >
      <input name="title" required placeholder="Material title" />
      <select name="kind">
        {(
          [
            "PDF Notes",
            "Lecture Slides",
            "Documents",
            "Images",
            "Study Guides",
            "Practice Worksheets",
          ] as const
        ).map((k) => (
          <option key={k}>{k}</option>
        ))}
      </select>
      <input
        name="file"
        required
        placeholder="Filename or resource reference"
      />
      <button type="submit">Add Material</button>
    </form>
  );
}
