"use client";
import { useStudentPortal } from "../../hooks/useStudentPortal";
import { StudentPage, StudentEmpty } from "../shared/StudentLayout";
import { AssignmentCard } from "./AssignmentCard";
export function AssignmentsPage() {
  const { teacher, classIds, student, progress } = useStudentPortal();
  const list = teacher.assignments.filter(
    (a) => classIds.includes(a.classId) && a.status === "Published",
  );
  return (
    <StudentPage
      title="Assignments"
      description="View homework, upload answers, and track teacher grading."
    >
      <div className="lms-stack">
        {list.length ? (
          list.map((a) => (
            <AssignmentCard
              key={a.id}
              assignment={a}
              submission={teacher.submissions.find(
                (s) => s.assignmentId === a.id && s.studentId === student.id,
              )}
              local={progress.submissions.find((s) => s.assignmentId === a.id)}
            />
          ))
        ) : (
          <StudentEmpty>No assignments have been published yet.</StudentEmpty>
        )}
      </div>
    </StudentPage>
  );
}
