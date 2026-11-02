"use client";
import Link from "next/link";
import { subjects, lessons, quizzes } from "../../data/student.seed";
import { useStudentPortal } from "../../hooks/useStudentPortal";
import { StudentPage, StudentPanel } from "../shared/StudentLayout";
export function CourseDetailPage({ slug }: { slug: string }) {
  const subject = subjects.find(
    (s) => s.toLowerCase().replaceAll(" ", "-") === decodeURIComponent(slug),
  );
  const { progress, teacher, classIds } = useStudentPortal();
  if (!subject)
    return (
      <StudentPage
        title="Course not found"
        description="Choose a subject from My Courses."
      >
        <Link href="/student/courses">Back to courses</Link>
      </StudentPage>
    );
  const courseLessons = lessons.filter((l) => l.subject === subject),
    courseQuizzes = quizzes.filter((q) => q.subject === subject);
  return (
    <StudentPage
      title={subject}
      description="Course overview, teacher, lessons, assignments, materials and progress."
    >
      <StudentPanel title="Course Overview">
        <p>
          Teacher:{" "}
          {teacher.classes.find(
            (c) => classIds.includes(c.id) && c.subject === subject,
          )?.teacherId ?? "Assigned by school"}
        </p>
        <p>
          Lesson progress:{" "}
          {
            courseLessons.filter((l) =>
              progress.completedLessonIds.includes(l.id),
            ).length
          }
          /{courseLessons.length}
        </p>
      </StudentPanel>
      <div className="lms-grid">
        <StudentPanel title="Lessons">
          {courseLessons.map((l) => (
            <p key={l.id}>
              <Link href={`/student/lessons?lesson=${l.id}`}>{l.title}</Link>
            </p>
          ))}
        </StudentPanel>
        <StudentPanel title="Assignments">
          {teacher.assignments
            .filter(
              (a) => classIds.includes(a.classId) && a.subject === subject,
            )
            .map((a) => (
              <p key={a.id}>
                <Link href="/student/assignments">{a.title}</Link>
              </p>
            ))}
        </StudentPanel>
        <StudentPanel title="Quizzes">
          {courseQuizzes.map((q) => (
            <p key={q.id}>
              <Link href={`/student/quizzes?quiz=${q.id}`}>{q.title}</Link>
            </p>
          ))}
        </StudentPanel>
        <StudentPanel title="Study Materials">
          {teacher.materials
            .filter(
              (m) => classIds.includes(m.classId) && m.subject === subject,
            )
            .map((m) => (
              <p key={m.id}>
                {m.title} · {m.kind}
              </p>
            ))}
        </StudentPanel>
      </div>
    </StudentPage>
  );
}
