import type { AttendanceStatus } from "@/types/domain";
export type AssignmentStatus = "Published" | "Draft";
export interface ClassGroup {
  id: string;
  name: string;
  section: string;
  subject: string;
  studentIds: string[];
  teacherId: string;
}
export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: AttendanceStatus;
}
export interface Assignment {
  id: string;
  classId: string;
  subject: string;
  title: string;
  instructions: string;
  deadline: string;
  marks: number;
  fileName?: string;
  status: AssignmentStatus;
}
export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  fileName: string;
  submittedAt: string;
  marks?: number;
  remarks?: string;
  reviewed: boolean;
}
export interface Material {
  id: string;
  classId: string;
  subject: string;
  title: string;
  kind:
    | "PDF Notes"
    | "Lecture Slides"
    | "Documents"
    | "Images"
    | "Study Guides"
    | "Practice Worksheets";
  fileName: string;
}
export interface ExamMark {
  id: string;
  exam: string;
  classId: string;
  studentId: string;
  subject: string;
  marks: number;
  total: number;
  remarks: string;
  submitted: boolean;
}
export interface TeacherNotice {
  id: string;
  title: string;
  body: string;
  audience: "Parents" | "Class";
  classId: string;
}
export interface ParentMessage {
  id: string;
  parentName: string;
  studentName: string;
  body: string;
}
export interface Period {
  id: string;
  day: string;
  time: string;
  classId: string;
  subject: string;
}
export interface TeacherData {
  classes: ClassGroup[];
  attendance: AttendanceRecord[];
  assignments: Assignment[];
  submissions: Submission[];
  materials: Material[];
  marks: ExamMark[];
  notices: TeacherNotice[];
  messages: ParentMessage[];
  periods: Period[];
}
