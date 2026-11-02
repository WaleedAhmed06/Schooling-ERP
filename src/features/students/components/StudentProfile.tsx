"use client";
import { X } from "lucide-react";
import type { Student } from "../types/student.types";
const groups: { title: string; keys: (keyof Student)[] }[] = [
  {
    title: "Personal Information",
    keys: ["name", "photo", "dob", "gender", "blood", "address", "phone"],
  },
  {
    title: "Academic Information",
    keys: [
      "admission",
      "roll",
      "class",
      "section",
      "session",
      "admissionDate",
      "history",
      "performance",
    ],
  },
  {
    title: "Parent Information",
    keys: ["father", "mother", "parentPhone", "parentEmail"],
  },
  { title: "Documents", keys: ["documents"] },
];
export function StudentProfile({
  student,
  onClose,
}: {
  student: Student;
  onClose: () => void;
}) {
  return (
    <div
      className="erp-modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="erp-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Student profile"
      >
        <div className="erp-modal-head">
          <h2>{student.name}</h2>
          <button onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>
        {groups.map((group) => (
          <section key={group.title} style={{ marginBottom: 20 }}>
            <h3 style={{ marginBottom: 12 }}>{group.title}</h3>
            <dl className="erp-details">
              {group.keys.map((key) => (
                <div key={key}>
                  <dt>{key.replace(/([A-Z])/g, " $1")}</dt>
                  <dd>{student[key] || "—"}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
        <div className="erp-modal-foot">
          <button className="ui-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
