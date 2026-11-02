"use client";
import { useTeacherData } from "../../hooks/useTeacherData";
import { TeacherPageFrame, TeacherPanel } from "../TeacherPageFrame";
import { ClassSelector } from "../shared/ClassSelector";
import { StudentRoster } from "../shared/StudentRoster";
export function MyClassesPage() {
  const { data, classId } = useTeacherData();
  const group = data.classes.find((c) => c.id === classId);
  return (
    <TeacherPageFrame
      title="My Classes"
      description="Assigned classes, subjects and enrolled students."
    >
      <ClassSelector />
      <TeacherPanel title="Enrolled Students">
        <StudentRoster ids={group?.studentIds ?? []} />
      </TeacherPanel>
    </TeacherPageFrame>
  );
}
