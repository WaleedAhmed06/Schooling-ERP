# School ERP — Unified Source (Phase 6 Theme & QA Progress)

Next.js App Router, React 19, TypeScript, Tailwind CSS v4, Zustand and **pnpm**.

This archive builds upon the Phase 5 progress codebase and adds semantic dark-mode styling across Admin, Teacher, Parent, Student and login UI, shared form/table/surface styling, mobile refinements and a static verification script. It does **not** claim Phase 6 completion.

## Start

```bash
corepack enable
pnpm install
pnpm typecheck
pnpm lint
pnpm build
pnpm dev
```

Static source checks without dependencies:

```bash
node scripts/verify-phase6.mjs
```

Demo users: admin@schooldemo.com, teacher@schooldemo.com, parent@schooldemo.com, student@schooldemo.com; password `123456` for each. The role switcher is for demo purposes only.

## Theme

`src/app/globals.css` defines semantic tokens for both `:root` and `.dark`. `next-themes` applies the `.dark` class. All role-specific surfaces, forms, tables, cards and lesson/quiz UI inherit tokens. Avoid hard-coded light-mode backgrounds when adding features.

## Validation status

The static Phase 6 script passed. The package registry was unavailable, so `pnpm install`, typecheck, production build and browser E2E were not run. See `docs/PHASE-6-TEST-MATRIX.md` for exact manual and workflow checks and remaining scope.

## Additive portal assistant

See `docs/AI-ASSISTANT.md` for the offline demo assistant, scope, and tests.
