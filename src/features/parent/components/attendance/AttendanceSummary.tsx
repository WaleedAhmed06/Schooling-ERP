import type { AttendanceRecord } from "@/features/teacher/types/teacher.types";
export function AttendanceSummary({
  history,
}: {
  history: AttendanceRecord[];
}) {
  const present = history.filter(
    (a) => a.status === "Present" || a.status === "Late",
  ).length;
  const values: [string, string | number][] = [
    ["Recorded Days", history.length],
    ["Present / Late", present],
    ["Absent", history.filter((a) => a.status === "Absent").length],
    [
      "Attendance",
      history.length
        ? `${Math.round((present / history.length) * 100)}%`
        : "No records",
    ],
  ];
  return (
    <div className="parent-cards">
      {values.map(([label, value]) => (
        <div className="parent-panel" key={label}>
          <h2>{label}</h2>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}
