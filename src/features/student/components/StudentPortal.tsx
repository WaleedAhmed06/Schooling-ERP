"use client";
import { useStudentPortal } from "../hooks/useStudentPortal";
import { StudentDashboardPage } from "./dashboard/StudentDashboardPage";
import { CoursesPage } from "./courses/CoursesPage";
import { CourseDetailPage } from "./courses/CourseDetailPage";
import { AssignmentsPage } from "./assignments/AssignmentsPage";
import { MaterialsPage } from "./materials/MaterialsPage";
import { LessonsPage } from "./lessons/LessonsPage";
import { QuizzesPage } from "./quizzes/QuizzesPage";
import { ResultsPage } from "./results/ResultsPage";
import { TimetablePage } from "./timetable/TimetablePage";
import { NotificationsPage } from "./notifications/NotificationsPage";
export function StudentPortal({
  section,
  detail,
  query,
}: {
  section: string;
  detail?: string;
  query?: string;
}) {
  const { hydrated } = useStudentPortal();
  if (!hydrated)
    return <div className="lms-panel">Loading your learning dashboard…</div>;
  switch (section) {
    case "":
      return <StudentDashboardPage />;
    case "courses":
      return detail ? <CourseDetailPage slug={detail} /> : <CoursesPage />;
    case "assignments":
      return <AssignmentsPage />;
    case "materials":
      return <MaterialsPage />;
    case "lessons":
      return <LessonsPage selected={query} />;
    case "quizzes":
      return <QuizzesPage selected={query} />;
    case "results":
      return <ResultsPage />;
    case "timetable":
      return <TimetablePage />;
    case "notifications":
      return <NotificationsPage />;
    default:
      return <p>Student module not found.</p>;
  }
}
