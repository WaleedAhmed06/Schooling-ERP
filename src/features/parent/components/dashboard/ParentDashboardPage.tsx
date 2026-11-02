"use client";
import Link from "next/link";
import { announcements } from "@/data/seeds/dashboard";
import { useParentPortal } from "../../hooks/useParentPortal";
import { useTeacherRecords } from "../../hooks/useTeacherRecords";
import { feeTotal, currency } from "../../utils/fees";
import { ParentPage, ParentPanel } from "../shared/ParentPanel";
import { ChildSelector } from "../shared/ChildSelector";
export function ParentDashboardPage() {
  const { child, data } = useParentPortal();
  const teacher = useTeacherRecords();
  const fees = data.vouchers.filter(
    (v) => v.studentId === child.id && v.status === "Pending",
  );
  const classes = teacher.classes
    .filter((c) => c.studentIds.includes(child.id))
    .map((c) => c.id);
  const records = teacher.attendance.filter((a) => a.studentId === child.id);
  const pct = records.length
    ? Math.round(
        (records.filter((a) => a.status === "Present" || a.status === "Late")
          .length /
          records.length) *
          100,
      ) + "%"
    : "—";
  return (
    <ParentPage
      title="Parent Dashboard"
      description="Monitor your child's school life, academics and fees in one place."
    >
      <ChildSelector />
      <div className="parent-cards">
        {[
          ["Child", child.name],
          ["Class", `${child.className} – ${child.section}`],
          ["Today's Attendance", child.attendance],
          ["Attendance Rate", pct],
          ["Pending Fees", currency(fees.reduce((s, v) => s + feeTotal(v), 0))],
          ["Next Fee Due", fees[0]?.dueDate ?? "All paid"],
        ].map(([label, value]) => (
          <div className="parent-panel" key={label}>
            <h2>{label}</h2>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="parent-cards">
        <ParentPanel title="Recent Assignments">
          {teacher.assignments
            .filter((a) => classes.includes(a.classId))
            .slice(0, 3)
            .map((a) => (
              <p key={a.id}>
                {a.title} · Due {a.deadline}
              </p>
            ))}
          <Link href="/parent/assignments">View assignments</Link>
        </ParentPanel>
        <ParentPanel title="Upcoming Exams & Results">
          <p>Midterm examinations · November 12, 2026</p>
          <p>
            {
              teacher.marks.filter(
                (m) => m.studentId === child.id && m.submitted,
              ).length
            }{" "}
            published results
          </p>
          <Link href="/parent/results">View results</Link>
        </ParentPanel>
        <ParentPanel title="School Announcements">
          {announcements
            .filter((a) => a.audience.includes("parent"))
            .map((a) => (
              <p key={a.id}>{a.title}</p>
            ))}
        </ParentPanel>
      </div>
    </ParentPage>
  );
}
