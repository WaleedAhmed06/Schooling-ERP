"use client";
import { useParentPortal } from "../../hooks/useParentPortal";
import { useTeacherRecords } from "../../hooks/useTeacherRecords";
import { ParentPage, ParentPanel } from "../shared/ParentPanel";
import { ChildSelector } from "../shared/ChildSelector";
import { ReportCard } from "./ReportCard";
export function ParentResultsPage() {
  const { child } = useParentPortal();
  const teacher = useTeacherRecords();
  const marks = teacher.marks.filter(
    (m) => m.studentId === child.id && m.submitted,
  );
  return (
    <ParentPage
      title="Exams & Results"
      description="Upcoming examinations, published results and subject-wise marks."
    >
      <ChildSelector />
      <ParentPanel title="Published Report Card">
        <ReportCard
          studentName={child.name}
          rollNumber={child.rollNumber}
          className={child.className}
          marks={marks}
        />
      </ParentPanel>
      <ParentPanel title="Upcoming Exams">
        <p>Midterm examinations · Starting November 12, 2026 (demo calendar)</p>
      </ParentPanel>
    </ParentPage>
  );
}
