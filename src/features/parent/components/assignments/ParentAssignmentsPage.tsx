"use client";
import { useParentPortal } from "../../hooks/useParentPortal";
import { useTeacherRecords } from "../../hooks/useTeacherRecords";
import { ParentPage, ParentPanel } from "../shared/ParentPanel";
import { ChildSelector } from "../shared/ChildSelector";
import { AssignmentCard } from "./AssignmentCard";
export function ParentAssignmentsPage() {
  const { child } = useParentPortal();
  const teacher = useTeacherRecords();
  const classes = teacher.classes
    .filter((c) => c.studentIds.includes(child.id))
    .map((c) => c.id);
  const assignments = teacher.assignments.filter((a) =>
    classes.includes(a.classId),
  );
  return (
    <ParentPage
      title="Assignments & Homework"
      description="Teacher instructions, deadlines, submissions, grades and remarks."
    >
      <ChildSelector />
      <ParentPanel title="Assigned Homework">
        {assignments.length ? (
          assignments.map((a) => (
            <AssignmentCard
              key={a.id}
              assignment={a}
              submission={teacher.submissions.find(
                (s) => s.assignmentId === a.id && s.studentId === child.id,
              )}
            />
          ))
        ) : (
          <p>No assignments available for this student.</p>
        )}
      </ParentPanel>
    </ParentPage>
  );
}
