"use client";
import { useMemo } from "react";
import { useParentPortal } from "../../hooks/useParentPortal";
import { useTeacherRecords } from "../../hooks/useTeacherRecords";
import { ParentPage, ParentPanel } from "../shared/ParentPanel";
import { ChildSelector } from "../shared/ChildSelector";
import { AttendanceSummary } from "./AttendanceSummary";
import { AttendanceHistory } from "./AttendanceHistory";
export function ParentAttendancePage() {
  const { child } = useParentPortal();
  const teacher = useTeacherRecords();
  const history = useMemo(
    () =>
      teacher.attendance
        .filter((a) => a.studentId === child.id)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [teacher.attendance, child.id],
  );
  return (
    <ParentPage
      title="Attendance"
      description="Daily records, late arrivals, absences and attendance percentage."
    >
      <ChildSelector />
      <AttendanceSummary history={history} />
      <ParentPanel title="Attendance History">
        <AttendanceHistory history={history} />
      </ParentPanel>
    </ParentPage>
  );
}
