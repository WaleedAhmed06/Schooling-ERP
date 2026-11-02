"use client";
import { useTeacherData } from "../../hooks/useTeacherData";
import { TeacherPageFrame, TeacherPanel } from "../TeacherPageFrame";
import { ClassSelector } from "../shared/ClassSelector";
import { MaterialForm } from "./MaterialForm";
export function MaterialsPage() {
  const { data, classId } = useTeacherData();
  return (
    <TeacherPageFrame
      title="Study Materials"
      description="Manage notes, slides and learning resources."
    >
      <ClassSelector />
      <TeacherPanel title="Add Material">
        <MaterialForm />
      </TeacherPanel>
      <TeacherPanel title="Available Materials">
        {data.materials
          .filter((m) => m.classId === classId)
          .map((m) => (
            <p key={m.id}>
              <strong>{m.title}</strong> · {m.kind} · {m.fileName}
            </p>
          ))}
      </TeacherPanel>
    </TeacherPageFrame>
  );
}
