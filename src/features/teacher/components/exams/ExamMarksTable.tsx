"use client";
import { students } from "@/data/seeds/dashboard";
import { useTeacherData } from "../../hooks/useTeacherData";
import type { ExamMark } from "../../types/teacher.types";
export function ExamMarksTable() {
  const { data, classId, update } = useTeacherData();
  function patch(id: string, changes: Partial<ExamMark>) {
    update((p) => ({
      ...p,
      marks: p.marks.map((m) => (m.id === id ? { ...m, ...changes } : m)),
    }));
  }
  return (
    <table className="teacher-table">
      <thead>
        <tr>
          <th>Student</th>
          <th>Exam</th>
          <th>Marks</th>
          <th>Remarks</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        {data.marks
          .filter((m) => m.classId === classId)
          .map((m) => (
            <tr key={m.id}>
              <td>
                {students.find((s) => s.id === m.studentId)?.name ??
                  m.studentId}
              </td>
              <td>{m.exam}</td>
              <td>
                <input
                  aria-label="Obtained marks"
                  type="number"
                  min="0"
                  max={m.total}
                  value={m.marks}
                  onChange={(e) =>
                    patch(m.id, { marks: Number(e.target.value) })
                  }
                />{" "}
                / {m.total}
              </td>
              <td>
                <input
                  aria-label="Teacher remarks"
                  value={m.remarks}
                  onChange={(e) => patch(m.id, { remarks: e.target.value })}
                />
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => patch(m.id, { submitted: true })}
                >
                  {m.submitted ? "Submitted" : "Submit Result"}
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
