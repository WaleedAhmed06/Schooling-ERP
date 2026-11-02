"use client";
import { useTeacherData } from "../../hooks/useTeacherData";
import { TeacherPageFrame, TeacherPanel } from "../TeacherPageFrame";
import { ClassSelector } from "../shared/ClassSelector";
import { AssignmentForm } from "./AssignmentForm";
import { SubmissionReview } from "./SubmissionReview";
export function AssignmentsPage() {
  const { data, classId } = useTeacherData();
  return (
    <TeacherPageFrame
      title="Assignments & Homework"
      description="Publish homework and grade student submissions."
    >
      <ClassSelector />
      <TeacherPanel title="Create Assignment">
        <AssignmentForm />
      </TeacherPanel>
      <TeacherPanel title="Published Assignments">
        {data.assignments
          .filter((a) => a.classId === classId)
          .map((a) => (
            <article className="teacher-record" key={a.id}>
              <strong>{a.title}</strong>
              <p>
                {a.subject} · Due {a.deadline} · {a.marks} marks
              </p>
              <p>{a.instructions}</p>
              <small>{a.fileName}</small>
              <SubmissionReview assignmentId={a.id} maxMarks={a.marks} />
            </article>
          ))}
      </TeacherPanel>
    </TeacherPageFrame>
  );
}
