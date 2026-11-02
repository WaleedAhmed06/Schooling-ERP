import fs from "node:fs";
import assert from "node:assert/strict";
const read = (f) => fs.readFileSync(f, "utf8");
const css = read("src/app/globals.css");
const tokens = [
  "background",
  "surface",
  "surface-alt",
  "surface-hover",
  "text",
  "text-muted",
  "border",
  "primary",
  "primary-soft",
  "field",
  "on-primary",
  "card",
  "foreground",
  "muted-foreground",
];
const light = css.match(/:root\{([^}]*)\}/)?.[1] ?? "";
const dark = css.match(/\.dark\{([^}]*)\}/)?.[1] ?? "";
for (const token of tokens) {
  assert(light.includes(`--${token}:`), `light missing ${token}`);
  assert(dark.includes(`--${token}:`), `dark missing ${token}`);
}
for (const role of ["teacher", "parent", "lms", "erp"])
  assert(css.includes(`.${role}-`), `missing ${role} styles`);
for (const fragment of [
  ".lms-course-icon",
  ".teacher-table",
  ".parent-panel",
  ".erp-modal",
  ".login-preview",
  ".lms-video",
])
  assert(css.includes(fragment), `missing themed ${fragment}`);
for (const role of ["admin", "teacher", "parent", "student"])
  assert(
    read("src/config/navigation.ts").includes(`${role}: [`),
    `missing ${role} navigation`,
  );
for (const feature of [
  "StudentPortal",
  "ParentPortal",
  "TeacherPortal",
  "AdminModule",
])
  assert(
    read("src/features/portal/components/PortalContent.tsx").includes(feature),
    `missing ${feature}`,
  );
assert(
  read("src/components/providers/app-providers.tsx").includes(
    'attribute="class"',
  ),
  "theme provider missing class switching",
);
assert(
  read("src/components/shared/theme-toggle.tsx").includes("setTheme("),
  "theme toggle missing",
);
assert(
  read("src/features/parent/services/message.service.ts").includes("reply:"),
  "reply flow missing",
);
assert(
  read("src/features/student/stores/student.store.ts").includes(
    "submitAssignment:",
  ),
  "student submit flow missing",
);
console.log(
  "PASS: theme tokens, all role navigation, role routers, theme provider and mock cross-portal wiring.",
);
console.log("NOTE: static checks only; not a replacement for browser testing.");
