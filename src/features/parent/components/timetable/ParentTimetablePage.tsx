"use client";
import { useParentPortal } from "../../hooks/useParentPortal";
import { useTeacherRecords } from "../../hooks/useTeacherRecords";
import { ParentPage, ParentPanel } from "../shared/ParentPanel";
import { ChildSelector } from "../shared/ChildSelector";
export function ParentTimetablePage() {
  const { child } = useParentPortal();
  const teacher = useTeacherRecords();
  const classes = teacher.classes
    .filter((c) => c.studentIds.includes(child.id))
    .map((c) => c.id);
  return (
    <ParentPage
      title="Weekly Timetable"
      description="Your child's class schedule and subjects."
    >
      <ChildSelector />
      <ParentPanel title="Class Timetable">
        <table className="teacher-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Period</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {teacher.periods
              .filter((p) => classes.includes(p.classId))
              .map((p) => (
                <tr key={p.id}>
                  <td>{p.day}</td>
                  <td>{p.time}</td>
                  <td>{p.subject}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </ParentPanel>
    </ParentPage>
  );
}
