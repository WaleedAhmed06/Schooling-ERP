import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const tests = [
  ["Phase 1: role access", "src/stores/auth.store.ts"],
  ["Phase 1: portal shell", "src/components/layout/portal-shell.tsx"],
  [
    "Phase 2: student management",
    "src/features/students/components/StudentManagement.tsx",
  ],
  ["Phase 2: generic admin modules", "src/features/admin/admin-module.tsx"],
  [
    "Phase 3: teacher portal",
    "src/features/teacher/components/TeacherPortal.tsx",
  ],
  [
    "Phase 3: grading",
    "src/features/teacher/components/assignments/SubmissionReview.tsx",
  ],
  ["Phase 4: parent portal", "src/features/parent/components/ParentPortal.tsx"],
  ["Phase 4: PDF generation", "src/features/parent/utils/pdf.ts"],
  ["Phase 5: student LMS", "src/features/student/components/StudentPortal.tsx"],
  [
    "Phase 5: quiz player",
    "src/features/student/components/quizzes/QuizPlayer.tsx",
  ],
  ["Phase 6: theme CSS", "src/app/globals.css"],
  ["Phase 6: test matrix", "docs/PHASE-6-TEST-MATRIX.md"],
];
let failed = 0;
for (const [name, file] of tests) {
  const exists = fs.existsSync(path.join(root, file));
  console.log(`${exists ? "PRESENT" : "MISSING"} ${name}: ${file}`);
  if (!exists) failed++;
}
console.log("Note: existence checks are NOT functional or visual tests.");
process.exitCode = failed ? 1 : 0;
