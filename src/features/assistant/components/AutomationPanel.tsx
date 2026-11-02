"use client";
import { useEffect, useState } from "react";
import type { Role } from "@/types/domain";
import type { AutomationDraft, AutomationKind } from "../types/ai.types";
import {
  allowedAutomationKinds,
  createAutomationDraft,
  loadDrafts,
  removeDraft,
  updateDraft,
} from "../services/automation.service";
export function AutomationPanel({ role }: { role: Role }) {
  const [drafts, setDrafts] = useState<AutomationDraft[]>([]);
  const [kind, setKind] = useState<AutomationKind>(
    allowedAutomationKinds(role)[0],
  );
  useEffect(() => {
    setDrafts(loadDrafts(role));
    setKind(allowedAutomationKinds(role)[0]);
  }, [role]);
  function create() {
    createAutomationDraft(role, kind);
    setDrafts(loadDrafts(role));
  }
  return (
    <div className="erp-ai-automation">
      <p className="erp-ai-caption">
        Create and edit draft recommendations. Approve for review only; nothing
        is sent automatically.
      </p>
      <div className="erp-ai-compose">
        <label htmlFor="erp-ai-kind">Draft type</label>
        <select
          id="erp-ai-kind"
          value={kind}
          onChange={(e) => setKind(e.target.value as AutomationKind)}
        >
          {allowedAutomationKinds(role).map((k) => (
            <option key={k} value={k}>
              {k.charAt(0).toUpperCase() + k.slice(1)}
            </option>
          ))}
        </select>
        <button type="button" onClick={create}>
          Generate draft
        </button>
      </div>
      {drafts.length === 0 && (
        <p>No drafts yet. Choose a type to generate one.</p>
      )}
      {drafts.map((d) => (
        <article key={d.id} className="erp-ai-draft">
          <div className="erp-ai-insight-title">
            <strong>{d.title}</strong>
            <span className="erp-ai-severity info">{d.status}</span>
          </div>
          <small>
            {d.audience} · {d.source}
          </small>
          <label className="erp-ai-caption" htmlFor={`draft-${d.id}`}>
            Message
          </label>
          <textarea
            id={`draft-${d.id}`}
            maxLength={2000}
            value={d.message}
            disabled={d.status === "approved"}
            onChange={(e) =>
              setDrafts(updateDraft(role, d.id, { message: e.target.value }))
            }
          />
          <div className="erp-ai-draft-actions">
            <button
              type="button"
              disabled={d.status === "approved"}
              onClick={() =>
                setDrafts(
                  updateDraft(role, d.id, {
                    status: "approved",
                    message: d.message,
                  }),
                )
              }
            >
              Approve draft
            </button>
            <button
              type="button"
              className="erp-ai-secondary"
              onClick={() => setDrafts(removeDraft(role, d.id))}
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
