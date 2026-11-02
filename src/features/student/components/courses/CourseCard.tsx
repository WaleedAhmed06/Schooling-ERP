import Link from "next/link";
export function CourseCard({
  subject,
  lessonCount,
  completed,
}: {
  subject: string;
  lessonCount: number;
  completed: number;
}) {
  return (
    <Link
      className="lms-course-card"
      href={`/student/courses/${encodeURIComponent(subject.toLowerCase().replaceAll(" ", "-"))}`}
    >
      <span className="lms-course-icon">{subject.slice(0, 1)}</span>
      <h2>{subject}</h2>
      <p>
        {lessonCount} lessons · {completed} completed
      </p>
      <div className="lms-progress">
        <span
          style={{
            width: `${lessonCount ? (completed / lessonCount) * 100 : 0}%`,
          }}
        />
      </div>
      <small>Open course →</small>
    </Link>
  );
}
