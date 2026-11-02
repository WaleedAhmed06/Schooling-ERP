import type { DemoUser, Role } from "@/types/domain";
export const roles: Role[] = ["admin", "teacher", "parent", "student"];
export const demoUsers: Record<Role, DemoUser> = {
  admin: {
    id: "a1",
    name: "Ayesha Khan",
    email: "admin@schooldemo.com",
    role: "admin",
    initials: "AK",
  },
  teacher: {
    id: "t1",
    name: "Muhammad Hassan",
    email: "teacher@schooldemo.com",
    role: "teacher",
    initials: "MH",
  },
  parent: {
    id: "p1",
    name: "Fatima Ali",
    email: "parent@schooldemo.com",
    role: "parent",
    initials: "FA",
  },
  student: {
    id: "s1",
    name: "Ahmed Ali",
    email: "student@schooldemo.com",
    role: "student",
    initials: "AA",
  },
};
export const roleTitles: Record<Role, string> = {
  admin: "School Administrator",
  teacher: "Teacher",
  parent: "Parent",
  student: "Student",
};
export const demoPassword = "123456";
