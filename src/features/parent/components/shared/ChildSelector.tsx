"use client";
import { useParentPortal } from "../../hooks/useParentPortal";
export function ChildSelector() {
  const { children, selectedChildId, selectChild } = useParentPortal();
  return (
    <label className="parent-selector">
      Viewing child{" "}
      <select
        value={selectedChildId}
        onChange={(e) => selectChild(e.target.value)}
      >
        {children.map((c) => (
          <option value={c.id} key={c.id}>
            {c.name} · {c.className}–{c.section}
          </option>
        ))}
      </select>
    </label>
  );
}
