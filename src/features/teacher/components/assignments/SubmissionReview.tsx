"use client";
import { studentRepository } from "@/features/student/services/student.service";
import { students } from "@/data/seeds/dashboard";
import { useTeacherData } from "../../hooks/useTeacherData";
import type { Submission } from "../../types/teacher.types";
export function SubmissionReview({
  assignmentId,
  maxMarks,
}: {
  assignmentId: string;
  maxMarks: number;
}) {
  const { data, update } = useTeacherData();
  const submissions = data.submissions.filter(
    (s) => s.assignmentId === assignmentId,
  );
  function patch(id: string, changes: Partial<Submission>) {
    update((p) => ({
      ...p,
      submissions: p.submissions.map((s) =>
        s.id === id ? { ...s, ...changes } : s,
      ),
    }));
  }
  return (
    <div className="teacher-submissions">
      {submissions.map((s) => (
        <div className="teacher-record" key={s.id}>
          <strong>
            {students.find((st) => st.id === s.studentId)?.name ?? s.studentId}
          </strong>{" "}
          · {s.fileName}
          {studentRepository
            .load(s.studentId)
            .submissions.find((a) => a.assignmentId === s.assignmentId)
            ?.fileData && (
            <a
              download={s.fileName}
              href={
                studentRepository
                  .load(s.studentId)
                  .submissions.find((a) => a.assignmentId === s.assignmentId)
                  ?.fileData
              }
              style={{ marginLeft: 12 }}
            >
              Download submitted file
            </a>
          )}
          <div className="teacher-controls">
            <label>
              Marks{" "}
              <input
                type="number"
                min="0"
                max={maxMarks}
                value={s.marks ?? ""}
                onChange={(e) =>
                  patch(s.id, {
                    marks:
                      e.target.value === ""
                        ? undefined
                        : Number(e.target.value),
                  })
                }
              />
            </label>
            <label>
              Remarks{" "}
              <input
                value={s.remarks ?? ""}
                onChange={(e) => patch(s.id, { remarks: e.target.value })}
              />
            </label>
            <button
              type="button"
              onClick={() => patch(s.id, { reviewed: true })}
            >
              Mark reviewed
            </button>
            <span>{s.reviewed ? "Reviewed" : "Pending review"}</span>
          </div>
        </div>
      ))}
      {submissions.length === 0 && <p>No submissions yet</p>}
    </div>
  );
}
