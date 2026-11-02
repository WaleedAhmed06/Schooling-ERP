"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { modules } from "@/features/admin/module-config";
import type { Student, StudentInput } from "../types/student.types";
import { validateStudent } from "../schemas/student.schema";
const fields = modules.students.fields;
export function StudentForm({
  initial,
  onClose,
  onSave,
}: {
  initial?: Student;
  onClose: () => void;
  onSave: (data: StudentInput) => Promise<boolean>;
}) {
  const [form, setForm] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      fields.map((f) => [
        f.key,
        initial?.[f.key as keyof Student] ?? f.options?.[0] ?? "",
      ]),
    ),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const data = form as unknown as StudentInput;
    const errs = validateStudent(data);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    const ok = await onSave(data);
    setSaving(false);
    if (ok) onClose();
  }
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
        aria-label="Student form"
      >
        <div className="erp-modal-head">
          <h2>{initial ? "Edit student" : "Add student"}</h2>
          <button onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>
        <form onSubmit={submit}>
          <div className="erp-form-grid">
            {fields.map((field) => (
              <label key={field.key}>
                {field.label}
                {field.type === "select" ? (
                  <select
                    value={form[field.key]}
                    onChange={(e) =>
                      setForm((v) => ({ ...v, [field.key]: e.target.value }))
                    }
                  >
                    {field.options?.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    value={form[field.key] ?? ""}
                    onChange={(e) =>
                      setForm((v) => ({ ...v, [field.key]: e.target.value }))
                    }
                  />
                ) : (
                  <input
                    type={field.type === "date" ? "date" : "text"}
                    value={form[field.key] ?? ""}
                    onChange={(e) =>
                      setForm((v) => ({ ...v, [field.key]: e.target.value }))
                    }
                  />
                )}
                {errors[field.key] && (
                  <span role="alert" style={{ color: "var(--danger)" }}>
                    {errors[field.key]}
                  </span>
                )}
              </label>
            ))}
          </div>
          <div className="erp-modal-foot">
            <button type="button" className="erp-outline" onClick={onClose}>
              Cancel
            </button>
            <button className="ui-button" disabled={saving}>
              {saving ? "Saving…" : "Save student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
