"use client";
import { subjects, lessons } from "../../data/student.seed";
import { useStudentPortal } from "../../hooks/useStudentPortal";
import { StudentPage } from "../shared/StudentLayout";
import { CourseCard } from "./CourseCard";
export function CoursesPage() {
  const { progress } = useStudentPortal();
  return (
    <StudentPage
      title="My Courses"
      description="Explore subjects, lessons, materials and assessments."
    >
      <div className="lms-grid">
        {subjects.map((subject) => {
          const list = lessons.filter((l) => l.subject === subject);
          return (
            <CourseCard
              key={subject}
              subject={subject}
              lessonCount={list.length}
              completed={
                list.filter((l) => progress.completedLessonIds.includes(l.id))
                  .length
              }
            />
          );
        })}
      </div>
    </StudentPage>
  );
}
