"use client";
import { announcements } from "@/data/seeds/dashboard";
import { useStudentPortal } from "../../hooks/useStudentPortal";
import { quizzes } from "../../data/student.seed";
import { StudentPage, StudentPanel } from "../shared/StudentLayout";
export function NotificationsPage() {
  const { teacher, classIds, student } = useStudentPortal();
  return (
    <StudentPage
      title="Notifications"
      description="Assignments, exam updates, study materials, quizzes and announcements."
    >
      <StudentPanel title="Recent Updates">
        {announcements
          .filter((a) => a.audience.includes("student"))
          .map((a) => (
            <div className="lms-list-item" key={a.id}>
              <strong>{a.title}</strong>
              <span>
                {a.description} · {a.date}
              </span>
            </div>
          ))}
        {teacher.assignments
          .filter((a) => classIds.includes(a.classId))
          .map((a) => (
            <div className="lms-list-item" key={a.id}>
              <strong>Assignment: {a.title}</strong>
              <span>Due {a.deadline}</span>
            </div>
          ))}
        {teacher.materials
          .filter((m) => classIds.includes(m.classId))
          .map((m) => (
            <div className="lms-list-item" key={m.id}>
              <strong>New Material: {m.title}</strong>
              <span>{m.subject}</span>
            </div>
          ))}
        {teacher.marks
          .filter((m) => m.studentId === student.id && m.submitted)
          .map((m) => (
            <div className="lms-list-item" key={m.id}>
              <strong>Result Published: {m.exam}</strong>
              <span>
                {m.subject}: {m.marks}/{m.total}
              </span>
            </div>
          ))}
        {quizzes.map((q) => (
          <div className="lms-list-item" key={q.id}>
            <strong>Quiz Available: {q.title}</strong>
            <span>{q.subject}</span>
          </div>
        ))}
      </StudentPanel>
    </StudentPage>
  );
}
