import type {
  Assignment,
  Submission,
} from "@/features/teacher/types/teacher.types";
import type { StudentSubmission } from "../../types/student.types";
import { AssignmentSubmissionForm } from "./AssignmentSubmissionForm";
export function AssignmentCard({
  assignment,
  submission,
  local,
}: {
  assignment: Assignment;
  submission?: Submission;
  local?: StudentSubmission;
}) {
  const status = submission?.reviewed
    ? "Graded"
    : submission
      ? "Under Review"
      : (local?.status ??
        (new Date() > new Date(`${assignment.deadline}T23:59:59`)
          ? "Late"
          : "Pending"));
  return (
    <article className="lms-panel">
      <div className="lms-row">
        <h2>{assignment.title}</h2>
        <span className="lms-pill">{status}</span>
      </div>
      <p>
        {assignment.subject} · Due {assignment.deadline} · {assignment.marks}{" "}
        marks
      </p>
      <p>{assignment.instructions}</p>
      {assignment.fileName && (
        <p>Teacher attachment: {assignment.fileName} (reference only)</p>
      )}
      {submission && (
        <p>
          Submitted: {submission.fileName} · Score:{" "}
          {submission.marks ?? "Awaiting grade"}/{assignment.marks} · Feedback:{" "}
          {submission.remarks ?? "Pending"}
        </p>
      )}
      {!submission?.reviewed && (
        <AssignmentSubmissionForm
          assignmentId={assignment.id}
          deadline={assignment.deadline}
        />
      )}
    </article>
  );
}
