"use client";
import type { Lesson } from "../../types/student.types";
import { useStudentStore } from "../../stores/student.store";
export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const completed = useStudentStore((s) =>
    s.progress.completedLessonIds.includes(lesson.id),
  );
  const complete = useStudentStore((s) => s.completeLesson);
  return (
    <div className="lms-panel">
      <span className="eyebrow">
        {lesson.subject} · {lesson.chapter}
      </span>
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>
      <div className="lms-video">
        <span>Video lesson preview</span>
        <small>Sample player UI — no video file supplied</small>
      </div>
      <h3>Lesson Notes</h3>
      <p>{lesson.notes}</p>
      <h3>Learning Resources</h3>
      {lesson.resources.map((r) => (
        <p key={r}>• {r}</p>
      ))}
      <button
        type="button"
        onClick={() => complete(lesson.id)}
        disabled={completed}
      >
        {completed ? "✓ Lesson Completed" : "Mark as Completed"}
      </button>
    </div>
  );
}
