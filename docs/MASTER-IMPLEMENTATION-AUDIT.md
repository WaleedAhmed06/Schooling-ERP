# School ERP — source-to-requirements audit and unified implementation register

**Canonical baseline:** latest Phase 6 dark-mode progress ZIP. All changes must stay in this single repository. Do not replace or redesign approved UI.

**Sources reviewed:** `School_ERP_Master_Phase_Status_and_Roadmap.docx` (all sections and tables); original `School ERP System.rtf` requirements; source tree of latest Phase 6 archive. Source presence is not proof of a working feature. No successful pnpm typecheck/build or browser E2E run is available.

## Phase 1 — foundation — PARTIAL / not accepted

- **Present:** Next.js App Router, role-aware portal shell, login/demo auth, role switcher, light/dark theme shell, shared layout and navigation.
- **Missing or unverified:** all four login/deep-link/logout flows, profile/settings/change-password UI, global search behavior, notifications, complete reusable modal/dialog/toast/empty/loading patterns, keyboard/mobile accessibility, typecheck/lint/build.
- **Acceptance:** every role logs in, routes and switches without leakage; refresh preserves role; layout is responsive; every shared control is keyboard accessible; build/test passes.

## Phase 2 — Admin — PARTIAL / not accepted

- **Present:** student CRUD feature, seeded dashboard and generic admin module framework.
- **Missing or unverified:** dashboard KPIs and charts from live mock records; student profile tabs and documents; teacher/staff profiles and assignments; class/section capacity and subject mappings; admin attendance and teacher attendance; fee structures, monthly vouchers, discounts, penalties, payment reconciliation; exams, grading, positions, report cards; timetable editor; targeted announcements; holidays/PTM/sports/events; transport routes/drivers/vehicles; all filtered reports and exports. The generic admin module still needs dedicated domain features. Cross-portal effects of Admin writes are not established.
- **Acceptance:** complete original Admin demo scenario and every Admin requirement in roadmap; changes appear in other portals.

## Phase 3 — Teacher — PARTIAL / not accepted

- **Present:** separate Teacher pages, class/attendance/assignments/materials/marks/timetable/communication, parent inbox; typed service and Zustand store.
- **Implemented in this audit pass:** repository change event, cross-portal teacher-data refresh, and Teacher download link for locally stored Student submission files.
- **Missing or unverified:** real demo teacher assignment/material attachments, teacher file preview, publish rules, detailed student profiles/performance, robust grading and feedback synchronization, exam schedule and grade publishing, school notifications, thread/unread messaging, end-to-end tests.
- **Acceptance:** Teacher creates/publishes assignment and material; Student downloads/submits; Teacher opens actual file, grades and remarks; Student/Parent see reviewed results after refresh.

## Phase 4 — Parent — PARTIAL / not accepted

- **Present:** dashboard, multi-child selector, attendance, fees and simulated checkout, PDFs, assignments, results, timetable, communication, calendar; Zustand.
- **Implemented in this audit pass:** Parent teacher-record hook now responds to same-tab teacher repository updates.
- **Missing or unverified:** fully consistent child scoping, monthly attendance, robust PDFs (Unicode and print layout), full threaded notifications, targeted notices, fee reminder automation (demo), calendar tied to Admin, exam positions/schedules, full workflow QA.
- **Acceptance:** Teacher marks attendance and grades; Parent immediately sees correct child's records; payment changes voucher state and yields accurate receipt PDF; parent message receives teacher reply.

## Phase 5 — Student Mini LMS — PARTIAL / not accepted

- **Present:** dashboard, seven courses, lessons/notes, quizzes, assignments/upload, marks/results, materials references, timetable, notifications; Zustand persistence.
- **Missing or unverified:** playable sample video, actual downloadable teacher materials/attachments, complete course teacher details, refresh-safe quiz timing and attempt rules, grade/performance charts, daily timetable, scoped notifications, selected-student identity instead of hard-coded `s1`, E2E testing.
- **Acceptance:** complete Student demo scenario with file upload/download and teacher review, quiz score persistence, accessible lesson playback, published grade visibility.

## Phase 6 — final polish — PARTIAL / not accepted

- **Present:** dark-mode CSS refactor and test matrix from earlier progress build.
- **Missing or unverified:** browser-verified dark mode on every route, mobile/tablet screenshots, contrast/accessibility, unified canonical data repository, deterministic demo reset, full requested seed volume, cross-portal integration, five original demo scripts, lint/typecheck/build and E2E suite, final deliverable.
- **Acceptance:** five demo scenarios pass, every page works in both themes at mobile/desktop widths, automated checks pass, clean pnpm install and final ZIP documented.

## Non-negotiable development rules

1. Preserve existing routes, visual hierarchy, CSS class names, spacing and approved design. Only change visual styles to fix theme/accessibility defects.
2. Implement one domain at a time, in the existing repo, with typed repository/service, state, selectors, reusable components, and tests. Avoid new monoliths.
3. Use one canonical record per student/class/assignment/attendance/fee/exam/message. Do not use independent portal copies as authoritative state.
4. Keep the frontend-only scope: local mock data and localStorage, no backend, real payments, SMS, email or push server.
5. A phase is **complete** only after requirements checklist, typecheck, lint, production build, browser workflows, mobile and both themes pass.

## Execution order

1. **Stabilize Phase 1:** install pnpm dependencies, fix TypeScript/build, test auth/navigation and shared UI.
2. **Finish Phase 2:** dedicated Admin domain features and shared repositories.
3. **Finish Phase 3:** Teacher attachments, grades, attendance, messages, real demo data flows.
4. **Finish Phase 4:** Parent child-scoped records, fees, PDFs, notifications and calendar.
5. **Finish Phase 5:** LMS files, video, quiz robustness, performance and student identity.
6. **Finish Phase 6:** dark-mode/mobile/accessibility, all five E2E scenarios, fixture scale, final ZIP.

## Validation environment

`corepack pnpm` could not run because the requested pnpm 10.0.0 package was not cached and registry access was unavailable. Therefore no claim of TypeScript, Next.js build or E2E success is made. Run `corepack enable && pnpm install && pnpm typecheck && pnpm lint && pnpm build` in an environment with package access. The included `node scripts/audit-source.mjs` checks file presence only.
