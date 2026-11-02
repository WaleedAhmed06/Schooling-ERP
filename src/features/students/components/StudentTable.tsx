"use client";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Student } from "../types/student.types";
export function StudentTable({
  students,
  onView,
  onEdit,
  onDelete,
}: {
  students: Student[];
  onView: (s: Student) => void;
  onEdit: (s: Student) => void;
  onDelete: (s: Student) => void;
}) {
  return (
    <div className="erp-table-wrap">
      <table className="erp-table">
        <thead>
          <tr>
            {[
              "Name",
              "Admission No.",
              "Roll No.",
              "Class",
              "Section",
              "Parent Contact",
              "Actions",
            ].map((x) => (
              <th key={x}>{x}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.admission}</td>
              <td>{s.roll}</td>
              <td>{s.class}</td>
              <td>{s.section}</td>
              <td>{s.parentPhone}</td>
              <td>
                <div className="erp-actions">
                  <button
                    aria-label={`View ${s.name}`}
                    onClick={() => onView(s)}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    aria-label={`Edit ${s.name}`}
                    onClick={() => onEdit(s)}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    aria-label={`Delete ${s.name}`}
                    onClick={() => onDelete(s)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan={7} className="erp-empty">
                No students match your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
