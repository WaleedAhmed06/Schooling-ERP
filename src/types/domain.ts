export type Role = "admin" | "teacher" | "parent" | "student";
export type AttendanceStatus = "Present" | "Absent" | "Late" | "Leave";
export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  initials: string;
}
export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  className: string;
  section: string;
  attendance: AttendanceStatus;
  parentId: string;
}
export interface Teacher {
  id: string;
  name: string;
  subject: string;
  classes: string[];
}
export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  audience: Role[];
}
export interface DashboardMetric {
  label: string;
  value: string;
  change?: string;
  icon:
    | "students"
    | "teachers"
    | "classes"
    | "attendance"
    | "fees"
    | "calendar"
    | "assignments"
    | "results";
}
