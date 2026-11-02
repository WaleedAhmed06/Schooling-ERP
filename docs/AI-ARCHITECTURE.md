# Complete AI Assistant — safe demo architecture

## Scope

- Chat: existing deterministic offline help remains the default. Optional live GPT mode uses a Next.js server route; API key stays server-side. The model receives **only the user-typed question and the role label**. No record retrieval, tool calls, or mutations.
- Analytics: deterministic, explainable, role-filtered summaries from existing Teacher and Parent mock repositories. No prediction model or LLM inference is claimed. No AI calls are needed.
- Automation: create, edit, locally approve, and delete drafts. Approval **does not send notifications or alter fees/attendance/marks**. These are templates, not background jobs.

## Security boundaries

1. This project has demo-only client-side role selection and no trusted server session. Server route must never query or expose school records based on a client-provided role.
2. Never expose OPENAI_API_KEY through NEXT_PUBLIC_ variables. No secret is required for offline mode.
3. Do not put private school data into live AI prompts. Live mode is explicitly opt-in and intended for generic questions only.
4. Drafts are stored under role-specific localStorage keys, not shared to other accounts/devices. No external dispatch.
5. Server route validates input, caps question size and provider response, uses a timeout and best-effort in-memory rate limiting. In-memory limits are not a distributed security control; deploy real authentication, rate limiting and monitoring before production.
6. Analytics is scoped to seeded demo identities. Admin/Teacher aggregates are broader; Parent reads seeded family vouchers; Student uses the seeded s1 identity. **Do not treat these as production authorization.**

## Features and data flow

- Existing portal shell -> AssistantWidget (no changes to original portal feature routes).
- Chat tab -> local rules or opt-in `/api/assistant` -> external LLM (general questions only).
- Insights tab -> analytics.service -> local mock repositories -> role-specific counts, source attribution.
- Drafts tab -> automation.service -> role-specific localStorage draft -> editable approval record.

## Run

`pnpm install && pnpm typecheck && pnpm build && pnpm dev`
Copy `.env.example` to `.env.local` and set `OPENAI_API_KEY` to enable optional live chat. Never commit real keys.

## Limitations / follow-up

- No autonomous scheduler, email/SMS/push sender, live school-data RAG, or external analytics engine; these would require a backend and verified authorization.
- Cross-device syncing is not supported. Local mock records can be stale between portals.
- Local AI metrics reflect available mock data, not comprehensive institutional reports.
- Verify dark/light appearance and all role workflows in browser; package dependencies unavailable in the build environment.
