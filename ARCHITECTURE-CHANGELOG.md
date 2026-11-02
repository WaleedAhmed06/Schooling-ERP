# Phase 3 Architecture Refactor

- `TeacherPortal` is a thin feature router; no business logic or forms.
- Each Teacher feature has dedicated page and reusable subcomponents.
- `stores/teacher.store.ts` uses Zustand for shared state and actions.
- `hooks/useTeacherData.ts` provides hydration and a typed store facade.
- `services/teacher.service.ts` implements the persistence contract and is the backend-replacement seam.
- `data/teacher.seed.ts` provides demo data; components do not persist directly.

## Known gaps

- Teacher repository remains separate from other portal repositories; cross-portal synchronization not yet implemented.
- Attachment fields are filename metadata, not real file uploads.
- Full feature testing and build validation are required before approval.
