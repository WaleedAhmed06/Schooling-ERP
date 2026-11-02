# School ERP Assistant — additive demo feature

This is an **offline, deterministic, rule-based portal guide**, not a generative AI model. The user requested an “AI feature” without specifying a provider or use case; this safe first implementation adds a chatbot-like experience without backend, API keys, or changes to existing workflows.

## Scope

- Available to Admin, Teacher, Parent and Student after demo login.
- Floating “Ask ERP” control with role-specific suggested prompts.
- Navigates only to pages available to the current role.
- Keeps the last 40 conversation messages per role in browser localStorage.
- Responsive panel, keyboard-accessible form and close/clear controls, CSS theme tokens for dark mode.
- No network calls, no access to private records, no LLM-generated answers and no writes to school entities.

## Files

- `src/features/assistant/components/AssistantWidget.tsx`
- `src/features/assistant/services/assistant.service.ts`
- `src/features/assistant/types/assistant.types.ts`
- `src/components/layout/PortalLayout.tsx` (one additive import and widget mount)
- `src/app/globals.css` (scoped `.erp-ai-*` styles)

## Testing

1. Log in with each of four demo roles, open the assistant, ask a suggested question, click the navigation link.
2. Confirm role-specific page links only; switch role and verify isolated conversation history.
3. Reload and confirm conversation persistence; clear and confirm removal.
4. Toggle light/dark theme; check panel and form contrast.
5. Check mobile screen width and keyboard navigation.
6. Run `pnpm install`, `pnpm typecheck`, `pnpm lint`, `pnpm build` and browser smoke tests.

## Limitations

The existing frontend-only project intentionally has no backend. To build an actual LLM assistant (natural language, retrieval from school records, actions), choose an AI provider, server-side API architecture, permissions, privacy boundaries, cost controls and audit logging first. Do not put AI API secrets in client code.
