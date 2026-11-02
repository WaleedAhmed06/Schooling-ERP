# Phase 6 — Validation Matrix

This is the single continuing School ERP codebase from the Phase 5 progress build. **No production build or browser E2E pass has been established in this environment.** The package registry could not be reached (`EAI_AGAIN registry.npmjs.org`).

## Automated static checks

`node scripts/verify-phase6.mjs` — verifies both theme token sets, the four portal route registrations, theme provider/toggle and basic mock cross-portal wiring. This is NOT a functional test.

## Manual dark-mode QA — run on both desktop and mobile

| Portal  | Screens to check                                                                                                                  | Check                                                                    |
| ------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Login   | Login, role cards, form, demo preview                                                                                             | Light/dark, contrast, autofill, focus, inputs                            |
| Admin   | Dashboard, Students, Teachers, Classes, Subjects, Attendance, Fees, Exams, Timetable, Announcements, Calendar, Transport, Reports | Cards, tables, modals, filters, dropdowns, charts, status badges, toasts |
| Teacher | Overview, Classes, Attendance, Assignments, Materials, Exams, Timetable, Communication                                            | Tables, forms, file inputs, records, message replies                     |
| Parent  | Overview, Children, Fees, Attendance, Assignments, Results, Timetable, Communication, Calendar                                    | Checkout, receipts, child selector, notices, PDFs                        |
| Student | Overview, Courses/detail, Assignments, Materials, Lessons, Quizzes, Results, Timetable, Notifications                             | Cards, quiz radio groups, timer, forms, progress bars                    |

Switch themes on each page and after navigation/reload; verify text remains readable and inputs/select menus are legible. Test 1440px, 1024px, 768px, 390px, 320px. Use keyboard navigation and inspect browser console.

## Five required cross-portal scenarios (pending browser execution)

1. **Administration:** Admin adds student, assigns Grade 5 Section A/teacher, creates fee voucher, records attendance and publishes announcement; verify affected role views.
2. **Teacher:** Teacher marks attendance, creates and publishes Mathematics assignment, uploads material; Student submits file; Teacher opens submission, grades, adds remarks; Parent sees status and grade.
3. **Parent fees:** Parent chooses child, opens fee voucher, pays by simulated JazzCash/Card, sees paid status, downloads receipt PDF, verifies transaction history.
4. **Student LMS:** Student opens Mathematics, views lesson and resources, completes lesson, submits homework, takes timed quiz and reviews score/feedback.
5. **Academic results:** Admin creates exam, Teacher enters/publishes marks, Parent downloads report card and Student sees published result and grade.

## Acceptance gate

- `corepack pnpm install` (or installed pnpm), `pnpm typecheck`, `pnpm lint`, `pnpm build` all pass.
- Manual dark-mode and responsive matrix passes in all four roles.
- Five end-to-end scenarios pass with consistent persisted records after refresh.
- Remaining Phase 2–5 missing requirements are addressed before claiming the entire ERP finished.

## Known limitations

- Mock persistence is browser-local, not multi-device sync.
- Admin still uses a generic module for many sections; Phase 2 feature depth is not fully implemented.
- Student lessons have sample video placeholders; Teacher material attachments and student file review remain incomplete.
- Basic PDF generation has limited formatting/non-ASCII support.
- Realistic high-volume seed data and full automated E2E coverage are not yet provided.
