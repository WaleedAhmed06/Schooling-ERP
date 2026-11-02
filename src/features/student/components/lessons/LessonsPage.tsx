"use client";
import { lessons } from "../../data/student.seed";
import { useStudentPortal } from "../../hooks/useStudentPortal";
import { StudentPage, StudentPanel } from "../shared/StudentLayout";
import { LessonPlayer } from "./LessonPlayer";
export function LessonsPage({ selected }: { selected?: string }) {
  const { progress } = useStudentPortal();
  const lesson = lessons.find((l) => l.id === selected);
  return (
    <StudentPage
      title="Online Lessons"
      description="Study lesson notes, explore resources, and track your progress."
    >
      <p>
        {progress.completedLessonIds.length}/{lessons.length} lessons completed
      </p>
      {lesson ? (
        <LessonPlayer lesson={lesson} />
      ) : (
        <StudentPanel title="Choose a lesson">
          <div className="lms-grid">
            {lessons.map((l) => (
              <a
                key={l.id}
                className="lms-list-item"
                href={`/student/lessons?lesson=${l.id}`}
              >
                <strong>{l.title}</strong>
                <span>
                  {l.subject} · {l.chapter}
                </span>
                <small>
                  {progress.completedLessonIds.includes(l.id)
                    ? "Completed"
                    : "Start lesson →"}
                </small>
              </a>
            ))}
          </div>
        </StudentPanel>
      )}
    </StudentPage>
  );
}
