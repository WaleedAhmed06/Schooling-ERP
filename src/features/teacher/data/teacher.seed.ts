import type { TeacherData } from "../types/teacher.types";
export const teacherSeed: TeacherData = {
  classes: [
    {
      id: "c5a",
      name: "Grade 5",
      section: "A",
      subject: "Mathematics",
      studentIds: ["s1", "s3", "s4"],
      teacherId: "t1",
    },
    {
      id: "c6b",
      name: "Grade 6",
      section: "B",
      subject: "Mathematics",
      studentIds: ["s2"],
      teacherId: "t1",
    },
  ],
  attendance: [],
  assignments: [
    {
      id: "a1",
      classId: "c5a",
      subject: "Mathematics",
      title: "Chapter 5 Exercise",
      instructions: "Complete questions 1–10.",
      deadline: "2026-11-08",
      marks: 20,
      status: "Published",
    },
  ],
  submissions: [
    {
      id: "sub1",
      assignmentId: "a1",
      studentId: "s1",
      fileName: "chapter5-ahmed.pdf",
      submittedAt: "2026-10-30",
      reviewed: false,
    },
  ],
  materials: [
    {
      id: "m1",
      classId: "c5a",
      subject: "Mathematics",
      title: "Chapter 5 Notes",
      kind: "PDF Notes",
      fileName: "chapter-5.pdf",
    },
  ],
  marks: [
    {
      id: "em1",
      exam: "Midterm",
      classId: "c5a",
      studentId: "s1",
      subject: "Mathematics",
      marks: 78,
      total: 100,
      remarks: "Good work",
      submitted: false,
    },
  ],
  notices: [],
  messages: [
    {
      id: "msg1",
      parentName: "Ali Khan",
      studentName: "Ahmed Ali",
      body: "Could you share the homework deadline?",
    },
  ],
  periods: [
    {
      id: "p1",
      day: "Monday",
      time: "09:00–09:45",
      classId: "c5a",
      subject: "Mathematics",
    },
    {
      id: "p2",
      day: "Tuesday",
      time: "10:00–10:45",
      classId: "c6b",
      subject: "Mathematics",
    },
  ],
};
