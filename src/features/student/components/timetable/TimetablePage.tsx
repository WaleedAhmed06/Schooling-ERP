"use client";
import { useStudentPortal } from "../../hooks/useStudentPortal";
import { StudentPage, StudentPanel } from "../shared/StudentLayout";
export function TimetablePage() {
  const { teacher, classIds } = useStudentPortal();
  const periods = teacher.periods.filter((p) => classIds.includes(p.classId));
  return (
    <StudentPage
      title="My Timetable"
      description="Your weekly class periods and subjects."
    >
      <StudentPanel title="Weekly Schedule">
        <table className="teacher-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {periods.map((p) => (
              <tr key={p.id}>
                <td>{p.day}</td>
                <td>{p.time}</td>
                <td>{p.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {periods.length === 0 && <p>No timetable assigned yet.</p>}
      </StudentPanel>
    </StudentPage>
  );
}
