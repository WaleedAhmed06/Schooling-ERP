"use client";
import { students } from "@/data/seeds/dashboard";
import type { AttendanceStatus } from "@/types/domain";
import { useTeacherData } from "../../hooks/useTeacherData";
import { TeacherPageFrame, TeacherPanel } from "../TeacherPageFrame";
import { ClassSelector } from "../shared/ClassSelector";
export function AttendancePage() {
  const { data, update, classId, date, setDate } = useTeacherData();
  const group = data.classes.find((c) => c.id === classId);
  const roster = students.filter((s) => group?.studentIds.includes(s.id));
  function mark(id: string, status: AttendanceStatus) {
    update((p) => ({
      ...p,
      attendance: [
        ...p.attendance.filter(
          (a) =>
            !(a.studentId === id && a.classId === classId && a.date === date),
        ),
        { id: crypto.randomUUID(), studentId: id, classId, date, status },
      ],
    }));
  }
  return (
    <TeacherPageFrame
      title="Attendance"
      description="Mark and review class attendance by date."
    >
      <ClassSelector />
      <div className="teacher-controls">
        <label>
          Date{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>
      <TeacherPanel title="Student Attendance">
        <table className="teacher-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Roll</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {roster.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.rollNumber}</td>
                <td>
                  <select
                    aria-label={`Attendance for ${s.name}`}
                    value={
                      data.attendance.find(
                        (a) =>
                          a.studentId === s.id &&
                          a.classId === classId &&
                          a.date === date,
                      )?.status ?? ""
                    }
                    onChange={(e) =>
                      mark(s.id, e.target.value as AttendanceStatus)
                    }
                  >
                    <option value="">Not marked</option>
                    {(["Present", "Absent", "Late", "Leave"] as const).map(
                      (status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ),
                    )}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TeacherPanel>
      <TeacherPanel title="Attendance History">
        {data.attendance
          .filter((a) => a.classId === classId)
          .map((a) => (
            <p key={a.id}>
              {a.date} ·{" "}
              {students.find((s) => s.id === a.studentId)?.name ?? a.studentId}{" "}
              · {a.status}
            </p>
          ))}
      </TeacherPanel>
    </TeacherPageFrame>
  );
}
