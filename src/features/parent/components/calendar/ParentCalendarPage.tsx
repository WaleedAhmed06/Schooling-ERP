"use client";
import { useParentPortal } from "../../hooks/useParentPortal";
import { ParentPage, ParentPanel } from "../shared/ParentPanel";
export function ParentCalendarPage() {
  const { data } = useParentPortal();
  return (
    <ParentPage
      title="School Calendar"
      description="Holidays, examinations, parent–teacher meetings and events."
    >
      <ParentPanel title="Upcoming School Events">
        {data.events.map((e) => (
          <article className="parent-record" key={e.id}>
            <strong>{e.title}</strong>
            <p>
              {e.date} · {e.kind}
            </p>
          </article>
        ))}
      </ParentPanel>
    </ParentPage>
  );
}
