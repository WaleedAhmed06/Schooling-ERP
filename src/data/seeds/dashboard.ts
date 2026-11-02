import type {
  Announcement,
  DashboardMetric,
  Role,
  Student,
  Teacher,
} from "@/types/domain";
export const students: Student[] = [
  {
    id: "s1",
    name: "Ahmed Ali",
    rollNumber: "0501",
    className: "Grade 5",
    section: "A",
    attendance: "Present",
    parentId: "p1",
  },
  {
    id: "s2",
    name: "Sara Ali",
    rollNumber: "0307",
    className: "Grade 3",
    section: "B",
    attendance: "Present",
    parentId: "p1",
  },
  {
    id: "s3",
    name: "Zain Malik",
    rollNumber: "0502",
    className: "Grade 5",
    section: "A",
    attendance: "Absent",
    parentId: "p2",
  },
  {
    id: "s4",
    name: "Hira Ahmed",
    rollNumber: "0503",
    className: "Grade 5",
    section: "A",
    attendance: "Present",
    parentId: "p3",
  },
];
export const teachers: Teacher[] = [
  {
    id: "t1",
    name: "Muhammad Hassan",
    subject: "Mathematics",
    classes: ["Grade 5-A", "Grade 6-B"],
  },
  {
    id: "t2",
    name: "Sana Qureshi",
    subject: "English",
    classes: ["Grade 5-A"],
  },
];
export const announcements: Announcement[] = [
  {
    id: "n1",
    title: "Parent–Teacher Meeting",
    description: "Meeting scheduled for next Friday",
    date: "Nov 06, 2026",
    audience: ["admin", "teacher", "parent"],
  },
  {
    id: "n2",
    title: "Midterm Examination Schedule",
    description: "Examination timetable has been published",
    date: "Nov 12, 2026",
    audience: ["admin", "teacher", "parent", "student"],
  },
  {
    id: "n3",
    title: "New Mathematics Assignment",
    description: "Chapter 5 exercises are now available",
    date: "Oct 30, 2026",
    audience: ["teacher", "parent", "student"],
  },
];
export const metrics: Record<Role, DashboardMetric[]> = {
  admin: [
    {
      label: "Total Students",
      value: "1,248",
      change: "+8.2%",
      icon: "students",
    },
    {
      label: "Total Teachers",
      value: "64",
      change: "+3 this term",
      icon: "teachers",
    },
    {
      label: "Today's Attendance",
      value: "94.8%",
      change: "1,183 present",
      icon: "attendance",
    },
    {
      label: "Fee Collection",
      value: "Rs. 2.84M",
      change: "This month",
      icon: "fees",
    },
  ],
  teacher: [
    { label: "Assigned Classes", value: "06", icon: "classes" },
    { label: "Total Students", value: "182", icon: "students" },
    { label: "Today's Classes", value: "04", icon: "calendar" },
    { label: "Pending Assignments", value: "12", icon: "assignments" },
  ],
  parent: [
    { label: "My Children", value: "02", icon: "students" },
    { label: "Attendance", value: "96.5%", icon: "attendance" },
    { label: "Pending Fees", value: "Rs. 10,500", icon: "fees" },
    { label: "Upcoming Exams", value: "03", icon: "calendar" },
  ],
  student: [
    { label: "My Subjects", value: "07", icon: "classes" },
    { label: "Pending Assignments", value: "04", icon: "assignments" },
    { label: "Completed", value: "18", icon: "results" },
    { label: "Attendance", value: "97%", icon: "attendance" },
  ],
};
export const enrollment = [
  { label: "Apr", value: 54 },
  { label: "May", value: 71 },
  { label: "Jun", value: 65 },
  { label: "Jul", value: 84 },
  { label: "Aug", value: 74 },
  { label: "Sep", value: 93 },
  { label: "Oct", value: 87 },
];
export const attendanceOverview = [
  { label: "Present", value: 94.8, color: "var(--success)" },
  { label: "Absent", value: 3.2, color: "var(--danger)" },
  { label: "Late", value: 1.4, color: "var(--warning)" },
  { label: "Leave", value: 0.6, color: "var(--primary)" },
];
