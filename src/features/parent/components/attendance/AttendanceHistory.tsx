import type { AttendanceRecord } from "@/features/teacher/types/teacher.types";
export function AttendanceHistory({
  history,
}: {
  history: AttendanceRecord[];
}) {
  return (
    <>
      {history.length ? (
        history.map((a) => (
          <p key={a.id}>
            {a.date} · {a.status}
          </p>
        ))
      ) : (
        <p>No recorded attendance for this student yet.</p>
      )}
    </>
  );
}
