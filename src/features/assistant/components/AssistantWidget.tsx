"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bot, MessageCircle, Send, X, Trash2 } from "lucide-react";
import type { Role } from "@/types/domain";
import type { AssistantMessage } from "../types/assistant.types";
import { getAssistantReply, suggestions } from "../services/assistant.service";
import { AnalyticsPanel } from "./AnalyticsPanel";
import { AutomationPanel } from "./AutomationPanel";
const key = (role: Role) => `school-erp:assistant:${role}:v1`;
type Tab = "chat" | "analytics" | "automation";
export function AssistantWidget({ role }: { role: Role }) {
  const [open, setOpen] = useState(false),
    [tab, setTab] = useState<Tab>("chat"),
    [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<AssistantMessage[]>([]),
    [live, setLive] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const end = useRef<HTMLDivElement>(null),
    input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key(role));
      setMessages(stored ? (JSON.parse(stored) as AssistantMessage[]) : []);
    } catch {
      setMessages([]);
    }
  }, [role]);
  useEffect(() => {
    if (open && tab === "chat") {
      input.current?.focus();
      end.current?.scrollIntoView({ block: "end" });
    }
  }, [open, tab, messages]);
  function persist(next: AssistantMessage[]) {
    setMessages(next);
    try {
      localStorage.setItem(key(role), JSON.stringify(next.slice(-40)));
    } catch {
      /* storage unavailable */
    }
  }
  async function send(question: string) {
    const q = question.trim().slice(0, 500);
    if (!q || busy) return;
    setError("");
    setDraft("");
    setBusy(true);
    const now = Date.now();
    const user: AssistantMessage = {
      id: `u-${now}`,
      role: "user",
      text: q,
      createdAt: new Date().toISOString(),
    };
    const previous = [...messages, user];
    persist(previous);
    let reply = getAssistantReply(role, q);
    if (live) {
      try {
        const response = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role, question: q }),
        });
        const json = (await response.json()) as {
          text?: string;
          error?: string;
        };
        if (!response.ok) throw new Error(json.error ?? "Live AI unavailable");
        reply = { text: json.text ?? reply.text };
      } catch (e) {
        setError(
          `${e instanceof Error ? e.message : "Live AI unavailable"} Using offline guide instead.`,
        );
      }
    }
    persist([
      ...previous,
      {
        id: `a-${now}`,
        role: "assistant",
        text: reply.text,
        link: reply.link,
        createdAt: new Date().toISOString(),
      },
    ]);
    setBusy(false);
  }
  return (
    <div className="erp-ai-root">
      <button
        type="button"
        className="erp-ai-launch"
        aria-label={open ? "Close school assistant" : "Open school assistant"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        <span>{open ? "Close" : "Ask ERP"}</span>
      </button>
      {open && (
        <section
          className="erp-ai-panel"
          role="dialog"
          aria-modal="false"
          aria-label="School ERP assistant"
        >
          <header className="erp-ai-header">
            <Bot size={22} />
            <div>
              <strong>School ERP Assistant</strong>
              <small>{role} · Chat / Insights / Drafts</small>
            </div>
            <button
              type="button"
              aria-label="Clear assistant conversation"
              title="Clear conversation"
              onClick={() => persist([])}
            >
              <Trash2 size={17} />
            </button>
            <button
              type="button"
              aria-label="Close assistant"
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>
          </header>
          <div
            className="erp-ai-tabs"
            role="tablist"
            aria-label="Assistant tools"
          >
            {(["chat", "analytics", "automation"] as Tab[]).map((t) => (
              <button
                type="button"
                role="tab"
                aria-selected={tab === t}
                key={t}
                onClick={() => setTab(t)}
              >
                {t === "chat"
                  ? "Chat"
                  : t === "analytics"
                    ? "Insights"
                    : "Drafts"}
              </button>
            ))}
          </div>
          {tab === "chat" ? (
            <>
              <div
                className="erp-ai-messages"
                aria-live="polite"
                aria-relevant="additions text"
              >
                {messages.length === 0 && (
                  <div className="erp-ai-welcome">
                    <strong>How can I help?</strong>
                    <p>
                      Use offline guidance or opt in to general live AI. Live AI
                      never receives school records.
                    </p>
                    <div className="erp-ai-suggestions">
                      {suggestions[role].map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => void send(q)}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {messages.map((m) => (
                  <div key={m.id} className={`erp-ai-message ${m.role}`}>
                    <p>{m.text}</p>
                    {m.link && (
                      <Link href={m.link} onClick={() => setOpen(false)}>
                        Open page →
                      </Link>
                    )}
                  </div>
                ))}
                <div ref={end} />
              </div>
              <label className="erp-ai-live">
                <input
                  type="checkbox"
                  checked={live}
                  onChange={(e) => setLive(e.target.checked)}
                />{" "}
                Use optional live AI (general questions only)
              </label>
              {error && (
                <p className="erp-ai-error" role="alert">
                  {error}
                </p>
              )}
              <form
                className="erp-ai-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  void send(draft);
                }}
              >
                <label className="sr-only" htmlFor={`erp-ai-input-${role}`}>
                  Ask the assistant
                </label>
                <input
                  id={`erp-ai-input-${role}`}
                  ref={input}
                  maxLength={500}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Ask about your portal…"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={!draft.trim() || busy}
                >
                  <Send size={19} />
                </button>
              </form>
            </>
          ) : (
            <div className="erp-ai-tool-scroll">
              {tab === "analytics" ? (
                <AnalyticsPanel role={role} />
              ) : (
                <AutomationPanel role={role} />
              )}
            </div>
          )}
          <p className="erp-ai-disclaimer">
            Demo only · No autonomous actions · Never enter sensitive personal
            data
          </p>
        </section>
      )}
    </div>
  );
}
