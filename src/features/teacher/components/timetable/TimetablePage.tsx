"use client";
import { useTeacherData } from "../../hooks/useTeacherData";
import { TeacherPageFrame, TeacherPanel } from "../TeacherPageFrame";
export function TimetablePage() {
  const { data } = useTeacherData();
  return (
    <TeacherPageFrame
      title="Weekly Timetable"
      description="Your teaching schedule and periods."
    >
      <TeacherPanel title="My Teaching Schedule">
        <table className="teacher-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Class</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {data.periods.map((p) => (
              <tr key={p.id}>
                <td>{p.day}</td>
                <td>{p.time}</td>
                <td>
                  {data.classes.find((c) => c.id === p.classId)?.name ??
                    p.classId}
                </td>
                <td>{p.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TeacherPanel>
    </TeacherPageFrame>
  );
}
