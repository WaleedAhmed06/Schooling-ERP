import { TeacherPageFrame, TeacherPanel } from "../TeacherPageFrame";
import { ClassSelector } from "../shared/ClassSelector";
import { ExamMarksTable } from "./ExamMarksTable";
export function ExamsPage() {
  return (
    <TeacherPageFrame
      title="Examinations & Marks"
      description="Enter and submit student examination marks."
    >
      <ClassSelector />
      <TeacherPanel title="Student Marks">
        <ExamMarksTable />
      </TeacherPanel>
    </TeacherPageFrame>
  );
}
