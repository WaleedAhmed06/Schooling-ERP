"use client";
import { quizzes } from "../../data/student.seed";
import { useStudentPortal } from "../../hooks/useStudentPortal";
import {
  StudentPage,
  StudentPanel,
  StudentEmpty,
} from "../shared/StudentLayout";
export function ResultsPage() {
  const { student, teacher, progress } = useStudentPortal();
  const marks = teacher.marks.filter(
    (m) => m.studentId === student.id && m.submitted,
  );
  return (
    <StudentPage
      title="Results & Performance"
      description="Track examination marks, quiz scores, grades and teacher feedback."
    >
      <div className="lms-grid">
        <StudentPanel title="Published Examination Results">
          {marks.length ? (
            <table className="teacher-table">
              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {marks.map((m) => (
                  <tr key={m.id}>
                    <td>{m.exam}</td>
                    <td>{m.subject}</td>
                    <td>
                      {m.marks}/{m.total}
                    </td>
                    <td>{m.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <StudentEmpty>
              Results will appear after your teacher publishes them.
            </StudentEmpty>
          )}
        </StudentPanel>
        <StudentPanel title="Quiz Performance">
          {progress.attempts.length ? (
            progress.attempts.map((a, i) => (
              <div className="lms-list-item" key={`${a.quizId}-${i}`}>
                <strong>
                  {quizzes.find((q) => q.id === a.quizId)?.title ?? "Quiz"}
                </strong>
                <span>
                  {a.score}/{a.total} · {Math.round((a.score / a.total) * 100)}%
                </span>
                <div className="lms-progress">
                  <span style={{ width: `${(a.score / a.total) * 100}%` }} />
                </div>
              </div>
            ))
          ) : (
            <StudentEmpty>No quizzes completed yet.</StudentEmpty>
          )}
        </StudentPanel>
      </div>
      <StudentPanel title="Academic Progress">
        <p>Lessons completed: {progress.completedLessonIds.length}</p>
        <p>Assignments submitted: {progress.submissions.length}</p>
        <p>Quizzes attempted: {progress.attempts.length}</p>
      </StudentPanel>
    </StudentPage>
  );
}
