"use client";
import Link from "next/link";
import { announcements } from "@/data/seeds/dashboard";
import { lessons } from "../../data/student.seed";
import { useStudentPortal } from "../../hooks/useStudentPortal";
import { StudentPage, StudentPanel } from "../shared/StudentLayout";
export function StudentDashboardPage() {
  const { student, teacher, classIds, progress } = useStudentPortal();
  const assignments = teacher.assignments.filter(
    (a) => classIds.includes(a.classId) && a.status === "Published",
  );
  const submitted = teacher.submissions.filter(
    (s) => s.studentId === student.id,
  );
  const pending = assignments.filter(
    (a) => !submitted.some((s) => s.assignmentId === a.id),
  );
  const periods = teacher.periods.filter((p) => classIds.includes(p.classId));
  const results = teacher.marks.filter(
    (m) => m.studentId === student.id && m.submitted,
  );
  return (
    <StudentPage
      title={`Welcome back, ${student.name.split(" ")[0]}!`}
      description={`${student.className} · Section ${student.section} · Roll ${student.rollNumber}`}
    >
      <div className="lms-grid">
        {[
          ["Pending Assignments", pending.length],
          ["Submitted Assignments", submitted.length],
          ["Completed Lessons", progress.completedLessonIds.length],
          ["Published Results", results.length],
        ].map(([label, value]) => (
          <div className="lms-panel" key={label}>
            <h2>{label}</h2>
            <strong className="lms-metric">{value}</strong>
          </div>
        ))}
      </div>
      <div className="lms-grid">
        <StudentPanel title="Today's / Weekly Classes">
          {periods.slice(0, 4).map((p) => (
            <p key={p.id}>
              {p.day} · {p.time} · {p.subject}
            </p>
          ))}
          <Link href="/student/timetable">View timetable →</Link>
        </StudentPanel>
        <StudentPanel title="Upcoming Homework">
          {pending.slice(0, 4).map((a) => (
            <p key={a.id}>
              {a.title} · Due {a.deadline}
            </p>
          ))}
          <Link href="/student/assignments">View assignments →</Link>
        </StudentPanel>
        <StudentPanel title="Recent Learning Materials">
          {teacher.materials
            .filter((m) => classIds.includes(m.classId))
            .slice(0, 4)
            .map((m) => (
              <p key={m.id}>
                {m.title} · {m.subject}
              </p>
            ))}
          <Link href="/student/materials">View materials →</Link>
        </StudentPanel>
        <StudentPanel title="Lessons & Progress">
          <p>
            {progress.completedLessonIds.length}/{lessons.length} completed
          </p>
          <Link href="/student/lessons">Continue learning →</Link>
        </StudentPanel>
        <StudentPanel title="Upcoming Exams & Results">
          <p>Midterm examinations begin November 12, 2026.</p>
          {results.slice(0, 2).map((m) => (
            <p key={m.id}>
              {m.subject}: {m.marks}/{m.total}
            </p>
          ))}
          <Link href="/student/results">View results →</Link>
        </StudentPanel>
        <StudentPanel title="Teacher Announcements">
          {announcements
            .filter((a) => a.audience.includes("student"))
            .map((a) => (
              <p key={a.id}>{a.title}</p>
            ))}
          {teacher.notices
            .filter((n) => classIds.includes(n.classId))
            .map((n) => (
              <p key={n.id}>{n.title}</p>
            ))}
        </StudentPanel>
      </div>
    </StudentPage>
  );
}
