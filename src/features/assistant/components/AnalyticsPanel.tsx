"use client";
import { useEffect, useState } from "react";
import type { Role } from "@/types/domain";
import { getAiSnapshot } from "../services/analytics.service";
import type { AiSnapshot } from "../types/ai.types";
export function AnalyticsPanel({ role }: { role: Role }) {
  const [snapshot, setSnapshot] = useState<AiSnapshot | null>(null);
  useEffect(() => {
    const refresh = () => setSnapshot(getAiSnapshot(role));
    refresh();
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener("school-erp:teacher-updated", refresh);
    window.addEventListener("school-erp:parent-updated", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("school-erp:teacher-updated", refresh);
      window.removeEventListener("school-erp:parent-updated", refresh);
    };
  }, [role]);
  if (!snapshot) return <p>Loading demo insights…</p>;
  return (
    <div className="erp-ai-analytics">
      <p className="erp-ai-caption">
        Derived from existing local demo data. No predictions or external API
        calls.
      </p>
      <div className="erp-ai-metrics">
        {Object.entries(snapshot.metrics).map(([name, value]) => (
          <div key={name} className="erp-ai-metric">
            <span>{name.replace(/([A-Z])/g, " $1")}</span>
            <strong>{value.toLocaleString("en-PK")}</strong>
          </div>
        ))}
      </div>
      {snapshot.insights.map((i) => (
        <article className="erp-ai-insight" key={i.id}>
          <div className="erp-ai-insight-title">
            <strong>{i.title}</strong>
            <span className={`erp-ai-severity ${i.severity}`}>
              {i.severity}
            </span>
          </div>
          <p>{i.detail}</p>
          <small>Source: {i.source}</small>
        </article>
      ))}
      <button
        className="erp-ai-secondary"
        type="button"
        onClick={() => setSnapshot(getAiSnapshot(role))}
      >
        Refresh insights
      </button>
    </div>
  );
}
