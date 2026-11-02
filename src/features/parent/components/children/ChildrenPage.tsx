"use client";
import { students, teachers } from "@/data/seeds/dashboard";
import { useParentPortal } from "../../hooks/useParentPortal";
import { ParentPage, ParentPanel } from "../shared/ParentPanel";
import { ChildSelector } from "../shared/ChildSelector";
export function ChildrenPage() {
  const { child, children } = useParentPortal();
  return (
    <ParentPage
      title="My Children"
      description="Profiles, class information, attendance and academic progress."
    >
      <ChildSelector />
      <div className="parent-cards">
        {children.map((c) => (
          <article className="parent-panel" key={c.id}>
            <h2>{c.name}</h2>
            <p>Roll No. {c.rollNumber}</p>
            <p>
              {c.className} · Section {c.section}
            </p>
            <p>Today's attendance: {c.attendance}</p>
          </article>
        ))}
      </div>
      <ParentPanel title={`${child.name}'s Profile`}>
        <p>
          Class: {child.className} · Section: {child.section}
        </p>
        <p>Roll number: {child.rollNumber}</p>
        <p>
          Assigned teacher: {teachers[0].name} · {teachers[0].subject}
        </p>
      </ParentPanel>
    </ParentPage>
  );
}
