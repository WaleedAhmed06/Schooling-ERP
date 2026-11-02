"use client";
import { useParentPortal } from "../hooks/useParentPortal";
import { ParentDashboardPage } from "./dashboard/ParentDashboardPage";
import { ChildrenPage } from "./children/ChildrenPage";
import { FeesPage } from "./fees/FeesPage";
import { ParentAttendancePage } from "./attendance/ParentAttendancePage";
import { ParentAssignmentsPage } from "./assignments/ParentAssignmentsPage";
import { ParentResultsPage } from "./results/ParentResultsPage";
import { ParentTimetablePage } from "./timetable/ParentTimetablePage";
import { ParentCommunicationPage } from "./communication/ParentCommunicationPage";
import { ParentCalendarPage } from "./calendar/ParentCalendarPage";
export function ParentPortal({ section }: { section: string }) {
  const { hydrated } = useParentPortal();
  if (!hydrated) return <p>Loading parent records…</p>;
  switch (section) {
    case "":
      return <ParentDashboardPage />;
    case "children":
      return <ChildrenPage />;
    case "fees":
      return <FeesPage />;
    case "attendance":
      return <ParentAttendancePage />;
    case "assignments":
      return <ParentAssignmentsPage />;
    case "results":
      return <ParentResultsPage />;
    case "timetable":
      return <ParentTimetablePage />;
    case "communication":
      return <ParentCommunicationPage />;
    case "calendar":
      return <ParentCalendarPage />;
    default:
      return <p>Page not found.</p>;
  }
}
