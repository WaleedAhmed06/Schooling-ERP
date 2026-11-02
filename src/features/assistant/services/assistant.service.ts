import type { Role } from "@/types/domain";
import { navigation } from "@/config/navigation";
import type { AssistantReply } from "../types/assistant.types";

/** Local, deterministic help assistant. Never claims to use a remote LLM or read private records. */
export const suggestions: Record<Role, string[]> = {
  admin: [
    "How do I add a student?",
    "Where are fee vouchers?",
    "How do I publish results?",
  ],
  teacher: [
    "How do I mark attendance?",
    "How do I grade homework?",
    "Where are parent messages?",
  ],
  parent: [
    "How do I pay fees?",
    "How can I see attendance?",
    "How do I contact a teacher?",
  ],
  student: [
    "Where are my assignments?",
    "How do I take a quiz?",
    "Where are my results?",
  ],
};
const intents: { terms: string[]; slug: string; description: string }[] = [
  {
    terms: [
      "fee",
      "payment",
      "voucher",
      "receipt",
      "challan",
      "jazzcash",
      "easypaisa",
    ],
    slug: "fees",
    description:
      "Open Fees & Payments to review vouchers, due dates, and simulated payments. This demo never processes real money.",
  },
  {
    terms: ["attendance", "absent", "present", "late"],
    slug: "attendance",
    description:
      "Open Attendance to review or manage daily attendance. Teachers can record class attendance; parents can review their children's records.",
  },
  {
    terms: ["assignment", "homework", "submit", "grade homework"],
    slug: "assignments",
    description:
      "Open Assignments to review deadlines and submissions. Teachers can create and grade homework; students can submit answers.",
  },
  {
    terms: ["result", "exam", "marks", "report card", "grade"],
    slug: "results",
    description:
      "Open Results to review published academic records. Exam management is available to administrators and teachers.",
  },
  {
    terms: ["quiz", "test"],
    slug: "quizzes",
    description:
      "Open Quizzes & Tests to attempt practice questions and review scores.",
  },
  {
    terms: ["course", "subject", "lesson", "study"],
    slug: "courses",
    description: "Open My Courses to explore subjects and lessons.",
  },
  {
    terms: ["material", "notes", "resource", "worksheet"],
    slug: "materials",
    description: "Open Learning Materials to see available teacher resources.",
  },
  {
    terms: ["timetable", "schedule", "period"],
    slug: "timetable",
    description: "Open Timetable for your class or teaching schedule.",
  },
  {
    terms: ["message", "contact", "communication", "teacher reply"],
    slug: "communication",
    description:
      "Open Communication to exchange messages in the same-browser demo.",
  },
  {
    terms: ["child", "children", "profile"],
    slug: "children",
    description:
      "Open My Children to switch between registered child profiles.",
  },
  {
    terms: ["student", "admission", "enroll"],
    slug: "students",
    description: "Open Students to manage enrollment and student profiles.",
  },
  {
    terms: ["teacher", "staff"],
    slug: "teachers",
    description: "Open Teachers & Staff to manage teacher records.",
  },
  {
    terms: ["announcement", "notice", "notification"],
    slug: "announcements",
    description: "Open Announcements or Notifications for school updates.",
  },
  {
    terms: ["calendar", "holiday", "event"],
    slug: "calendar",
    description: "Open School Calendar to see events and holidays.",
  },
  {
    terms: ["transport", "route", "bus"],
    slug: "transport",
    description: "Open Transport to review routes and vehicle information.",
  },
  {
    terms: ["report", "analytics"],
    slug: "reports",
    description: "Open Reports & Analytics to explore the available summaries.",
  },
  {
    terms: ["class", "section"],
    slug: "classes",
    description: "Open Classes to see class and section information.",
  },
];
const aliases: Record<string, string[]> = {
  results: ["exams"],
  exams: ["results"],
  announcements: ["notifications", "communication"],
  notifications: ["announcements", "communication"],
  teachers: ["classes"],
  children: [""],
  students: ["classes"],
  courses: ["lessons"],
  lessons: ["courses"],
};
export function getAssistantReply(
  role: Role,
  question: string,
): AssistantReply {
  const input = question.toLowerCase().trim();
  if (!input) return { text: "Ask me how to find a feature in your portal." };
  if (/(hello|hi|salam|assalam|help|what can you do)/.test(input))
    return {
      text: `I'm your ${role} portal guide. I can explain where features are and open pages available to your role. I don't access a live AI service or make changes to school records.`,
    };
  const items = navigation[role];
  const ranked = intents
    .map((intent) => ({
      ...intent,
      score: intent.terms.reduce(
        (n, term) => n + (input.includes(term) ? term.length : 0),
        0,
      ),
    }))
    .sort((a, b) => b.score - a.score);
  const match = ranked.find(
    (intent) =>
      intent.score > 0 &&
      (items.some((item) => item.slug === intent.slug) ||
        (aliases[intent.slug] ?? []).some((slug) =>
          items.some((item) => item.slug === slug),
        )),
  );
  if (match) {
    const item =
      items.find((item) => item.slug === match.slug) ||
      items.find((item) => (aliases[match.slug] ?? []).includes(item.slug));
    if (item)
      return {
        text: `${match.description} In your ${role} portal, use “${item.label}”.`,
        link: `/${role}${item.slug ? `/${item.slug}` : ""}`,
      };
  }
  const direct = items.find((item) =>
    item.label
      .toLowerCase()
      .split(/\s|&/)
      .some((word) => word.length > 3 && input.includes(word)),
  );
  if (direct)
    return {
      text: `You can find “${direct.label}” in your sidebar.`,
      link: `/${role}${direct.slug ? `/${direct.slug}` : ""}`,
    };
  return {
    text: `I can guide you around the ${role} portal, but I can't verify that answer from the demo data. Try asking about ${suggestions[role].map((s) => s.replace(/[?]/g, "")).join(", or ")}.`,
  };
}
