import type {
  Assignment,
  Submission,
} from "@/features/teacher/types/teacher.types";
export function AssignmentCard({
  assignment,
  submission,
}: {
  assignment: Assignment;
  submission?: Submission;
}) {
  return (
    <article className="parent-record">
      <strong>{assignment.title}</strong>
      <p>
        {assignment.subject} · Deadline {assignment.deadline} ·{" "}
        {assignment.marks} marks
      </p>
      <p>{assignment.instructions}</p>
      <p>
        Status:{" "}
        {submission
          ? submission.reviewed
            ? "Reviewed"
            : "Submitted"
          : "Not submitted"}
      </p>
      {submission && (
        <p>
          Grade: {submission.marks ?? "Not graded"} · Teacher remarks:{" "}
          {submission.remarks || "—"}
        </p>
      )}
    </article>
  );
}
