import { announcements } from "@/data/seeds/dashboard";
import type { TeacherNotice } from "@/features/teacher/types/teacher.types";
export function SchoolAnnouncements({
  teacherNotices,
}: {
  teacherNotices: TeacherNotice[];
}) {
  return (
    <>
      {announcements
        .filter((a) => a.audience.includes("parent"))
        .map((a) => (
          <p key={a.id}>
            <strong>{a.title}</strong> · {a.description}
          </p>
        ))}
      {teacherNotices
        .filter((n) => n.audience === "Parents")
        .map((n) => (
          <p key={n.id}>
            <strong>{n.title}</strong> · {n.body}
          </p>
        ))}
    </>
  );
}
