"use client";
import { useStudentPortal } from "../../hooks/useStudentPortal";
import {
  StudentPage,
  StudentPanel,
  StudentEmpty,
} from "../shared/StudentLayout";
export function MaterialsPage() {
  const { teacher, classIds } = useStudentPortal();
  const materials = teacher.materials.filter((m) =>
    classIds.includes(m.classId),
  );
  return (
    <StudentPage
      title="Learning Materials"
      description="Teacher-shared notes, documents, slides, images and worksheets."
    >
      <StudentPanel title="Available Resources">
        {materials.length ? (
          materials.map((m) => (
            <div className="lms-list-item" key={m.id}>
              <strong>{m.title}</strong>
              <span>
                {m.subject} · {m.kind} · {m.fileName}
              </span>
              <small>
                File reference only; teacher file upload is not yet available.
              </small>
            </div>
          ))
        ) : (
          <StudentEmpty>No materials published yet.</StudentEmpty>
        )}
      </StudentPanel>
    </StudentPage>
  );
}
