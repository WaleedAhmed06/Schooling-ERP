import type { Role } from "@/types/domain";
export interface NavItem {
  label: string;
  slug: string;
  icon: string;
  phase: number;
}
export const navigation: Record<Role, NavItem[]> = {
  admin: [
    { label: "Overview", slug: "", icon: "layout-dashboard", phase: 1 },
    { label: "Students", slug: "students", icon: "graduation-cap", phase: 2 },
    { label: "Teachers & Staff", slug: "teachers", icon: "users", phase: 2 },
    { label: "Classes & Sections", slug: "classes", icon: "school", phase: 2 },
    { label: "Subjects", slug: "subjects", icon: "book-open", phase: 2 },
    {
      label: "Attendance",
      slug: "attendance",
      icon: "clipboard-check",
      phase: 2,
    },
    { label: "Fees & Finance", slug: "fees", icon: "wallet", phase: 2 },
    {
      label: "Examinations & Results",
      slug: "exams",
      icon: "file-check",
      phase: 2,
    },
    { label: "Timetables", slug: "timetable", icon: "calendar-days", phase: 2 },
    {
      label: "Announcements",
      slug: "announcements",
      icon: "megaphone",
      phase: 2,
    },
    { label: "School Calendar", slug: "calendar", icon: "calendar", phase: 2 },
    { label: "Transport", slug: "transport", icon: "bus", phase: 2 },
    {
      label: "Reports & Analytics",
      slug: "reports",
      icon: "chart-column",
      phase: 2,
    },
  ],
  teacher: [
    { label: "Overview", slug: "", icon: "layout-dashboard", phase: 1 },
    { label: "My Classes", slug: "classes", icon: "school", phase: 3 },
    {
      label: "Attendance",
      slug: "attendance",
      icon: "clipboard-check",
      phase: 3,
    },
    {
      label: "Assignments & Homework",
      slug: "assignments",
      icon: "notebook-pen",
      phase: 3,
    },
    { label: "Study Materials", slug: "materials", icon: "files", phase: 3 },
    {
      label: "Examinations & Marks",
      slug: "exams",
      icon: "file-check",
      phase: 3,
    },
    { label: "Timetable", slug: "timetable", icon: "calendar-days", phase: 3 },
    {
      label: "Communication",
      slug: "communication",
      icon: "messages-square",
      phase: 3,
    },
  ],
  parent: [
    { label: "Overview", slug: "", icon: "layout-dashboard", phase: 1 },
    { label: "My Children", slug: "children", icon: "users", phase: 4 },
    { label: "Fees & Payments", slug: "fees", icon: "wallet", phase: 4 },
    {
      label: "Attendance",
      slug: "attendance",
      icon: "clipboard-check",
      phase: 4,
    },
    {
      label: "Assignments",
      slug: "assignments",
      icon: "notebook-pen",
      phase: 4,
    },
    { label: "Exams & Results", slug: "results", icon: "file-check", phase: 4 },
    { label: "Timetable", slug: "timetable", icon: "calendar-days", phase: 4 },
    {
      label: "Communication",
      slug: "communication",
      icon: "messages-square",
      phase: 4,
    },
    { label: "School Calendar", slug: "calendar", icon: "calendar", phase: 4 },
  ],
  student: [
    { label: "Overview", slug: "", icon: "layout-dashboard", phase: 1 },
    { label: "My Courses", slug: "courses", icon: "book-open", phase: 5 },
    {
      label: "Assignments",
      slug: "assignments",
      icon: "notebook-pen",
      phase: 5,
    },
    { label: "Learning Materials", slug: "materials", icon: "files", phase: 5 },
    { label: "Online Lessons", slug: "lessons", icon: "play-circle", phase: 5 },
    { label: "Quizzes & Tests", slug: "quizzes", icon: "file-check", phase: 5 },
    {
      label: "Results & Performance",
      slug: "results",
      icon: "chart-column",
      phase: 5,
    },
    { label: "Timetable", slug: "timetable", icon: "calendar-days", phase: 5 },
    { label: "Notifications", slug: "notifications", icon: "bell", phase: 5 },
  ],
};
