import fs from "node:fs";
import path from "node:path";
const base = process.cwd();
const required = [
  "src/features/assistant/components/AssistantWidget.tsx",
  "src/features/assistant/components/AnalyticsPanel.tsx",
  "src/features/assistant/components/AutomationPanel.tsx",
  "src/features/assistant/services/analytics.service.ts",
  "src/features/assistant/services/automation.service.ts",
  "src/app/api/assistant/route.ts",
  "docs/AI-ARCHITECTURE.md",
];
for (const name of required) {
  if (!fs.existsSync(path.join(base, name))) throw Error(`Missing ${name}`);
}
const route = fs.readFileSync(
  path.join(base, "src/app/api/assistant/route.ts"),
  "utf8",
);
if (route.includes("teacherService") || route.includes("parentRepository"))
  throw Error("Server-side AI route must not access mock school data");
console.log(
  "AI module static guard checks passed. This does not replace build or browser tests.",
);
