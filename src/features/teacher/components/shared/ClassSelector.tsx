"use client";
import { useTeacherData } from "../../hooks/useTeacherData";
export function ClassSelector() {
  const { data, classId, setClassId } = useTeacherData();
  return (
    <div className="teacher-controls">
      <label>
        Class / Section{" "}
        <select
          aria-label="Select class"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
        >
          {data.classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} – {c.section} ({c.subject})
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
