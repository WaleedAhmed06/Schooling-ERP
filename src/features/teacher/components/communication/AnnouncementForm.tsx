"use client";
import { useTeacherData } from "../../hooks/useTeacherData";
import type { TeacherNotice } from "../../types/teacher.types";
export function AnnouncementForm() {
  const { update, classId } = useTeacherData();
  return (
    <form
      className="teacher-form"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const f = new FormData(form);
        const notice: TeacherNotice = {
          id: crypto.randomUUID(),
          classId,
          title: String(f.get("title")),
          body: String(f.get("body")),
          audience: String(f.get("audience")) as TeacherNotice["audience"],
        };
        update((p) => ({ ...p, notices: [notice, ...p.notices] }));
        form.reset();
      }}
    >
      <input name="title" required placeholder="Announcement title" />
      <textarea name="body" required placeholder="Announcement text" />
      <select name="audience">
        <option>Parents</option>
        <option>Class</option>
      </select>
      <button type="submit">Send Announcement</button>
    </form>
  );
}
