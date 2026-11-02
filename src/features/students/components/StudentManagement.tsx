"use client";
import { useMemo, useState } from "react";
import { Download, Plus, Search } from "lucide-react";
import { downloadCSV } from "@/features/admin/storage";
import { useStudents } from "../hooks/useStudents";
import type { Student } from "../types/student.types";
import { StudentTable } from "./StudentTable";
import { StudentForm } from "./StudentForm";
import { StudentProfile } from "./StudentProfile";
export function StudentManagement() {
  const { students, loading, error, create, update, remove } = useStudents();
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Student | "new" | null>(null);
  const [viewing, setViewing] = useState<Student | null>(null);
  const grades = useMemo(
    () => Array.from(new Set(students.map((s) => s.class))).sort(),
    [students],
  );
  const sections = useMemo(
    () => Array.from(new Set(students.map((s) => s.section))).sort(),
    [students],
  );
  const filtered = useMemo(
    () =>
      students.filter(
        (s) =>
          (!grade || s.class === grade) &&
          (!section || s.section === section) &&
          [s.name, s.admission, s.roll, s.father, s.parentPhone].some((v) =>
            v.toLowerCase().includes(query.toLowerCase()),
          ),
      ),
    [students, grade, section, query],
  );
  const pages = Math.max(1, Math.ceil(filtered.length / 10));
  const visible = filtered.slice((page - 1) * 10, page * 10);
  async function deleteStudent(student: Student) {
    if (window.confirm(`Delete ${student.name} from the demo?`))
      await remove(student.id);
  }
  return (
    <section className="erp-module">
      <div className="erp-heading">
        <div>
          <span className="eyebrow">ADMIN PORTAL · STUDENTS</span>
          <h1>Student Management</h1>
          <p>
            Admissions, profiles, academic information, and parent contacts.
          </p>
        </div>
        <button className="ui-button" onClick={() => setEditing("new")}>
          <Plus size={17} /> Add student
        </button>
      </div>
      <div className="erp-stats">
        <div className="card erp-stat">
          <small>Total students</small>
          <strong>{students.length}</strong>
        </div>
        <div className="card erp-stat">
          <small>Classes represented</small>
          <strong>{grades.length}</strong>
        </div>
        <div className="card erp-stat">
          <small>Sections represented</small>
          <strong>{sections.length}</strong>
        </div>
      </div>
      <div className="card erp-panel">
        <div className="erp-toolbar">
          <div className="erp-search">
            <Search size={17} />
            <input
              aria-label="Search students"
              placeholder="Search by name, admission or parent"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <select
            aria-label="Filter by class"
            value={grade}
            onChange={(e) => {
              setGrade(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All classes</option>
            {grades.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
          <select
            aria-label="Filter by section"
            value={section}
            onChange={(e) => {
              setSection(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All sections</option>
            {sections.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <button
            className="erp-outline"
            onClick={() =>
              downloadCSV(
                filtered.map((student) => ({ ...student })),
                "students",
              )
            }
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
        {error && (
          <p role="alert" style={{ color: "var(--danger)", marginBottom: 12 }}>
            {error}
          </p>
        )}
        {loading ? (
          <p>Loading students…</p>
        ) : (
          <StudentTable
            students={visible}
            onView={setViewing}
            onEdit={setEditing}
            onDelete={deleteStudent}
          />
        )}
        <div className="erp-pagination">
          <span>
            {filtered.length} students · Page {page} of {pages}
          </span>
          <div>
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Previous
            </button>
            <button
              disabled={page >= pages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {editing && (
        <StudentForm
          initial={editing === "new" ? undefined : editing}
          onClose={() => setEditing(null)}
          onSave={(data) =>
            editing === "new" ? create(data) : update(editing.id, data)
          }
        />
      )}
      {viewing && (
        <StudentProfile student={viewing} onClose={() => setViewing(null)} />
      )}
    </section>
  );
}
