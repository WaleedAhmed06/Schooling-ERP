"use client";
import { useTeacherData } from "../hooks/useTeacherData";
import { MyClassesPage } from "./classes/MyClassesPage";
import { AttendancePage } from "./attendance/AttendancePage";
import { AssignmentsPage } from "./assignments/AssignmentsPage";
import { MaterialsPage } from "./materials/MaterialsPage";
import { ExamsPage } from "./exams/ExamsPage";
import { TimetablePage } from "./timetable/TimetablePage";
import { CommunicationPage } from "./communication/CommunicationPage";
export function TeacherPortal({ section }: { section: string }) {
  const ready = useTeacherData().ready;
  if (!ready)
    return <div className="teacher-panel">Loading teacher records…</div>;
  switch (section) {
    case "classes":
      return <MyClassesPage />;
    case "attendance":
      return <AttendancePage />;
    case "assignments":
      return <AssignmentsPage />;
    case "materials":
      return <MaterialsPage />;
    case "exams":
      return <ExamsPage />;
    case "timetable":
      return <TimetablePage />;
    case "communication":
      return <CommunicationPage />;
    default:
      return null;
  }
}
