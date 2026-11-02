export type Field = {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "select" | "textarea";
  options?: string[];
  required?: boolean;
};
export type Module = {
  title: string;
  description: string;
  fields: Field[];
  seed: Record<string, string>[];
};
const field = (
  key: string,
  label: string,
  type: Field["type"] = "text",
  options?: string[],
): Field => ({ key, label, type, options, required: true });
const select = (key: string, label: string, options: string[]) =>
  field(key, label, "select", options);
const names = [
  "Ahmed Ali",
  "Ayesha Khan",
  "Hassan Raza",
  "Fatima Noor",
  "Bilal Ahmed",
  "Zainab Malik",
  "Usman Tariq",
  "Maryam Iqbal",
  "Hamza Farooq",
  "Sana Shah",
];
const grades = [
  "Playgroup",
  "Nursery",
  "KG",
  ...Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`),
];
const subjects = [
  "Mathematics",
  "English",
  "Science",
  "Computer",
  "Urdu",
  "Social Studies",
  "Islamiat",
  "Physics",
  "Chemistry",
  "Biology",
  "Pakistan Studies",
];
const sections = ["A", "B", "C"];
export const modules: Record<string, Module> = {
  students: {
    title: "Student Management",
    description:
      "Admissions, profiles, classes, parent contacts and academic records.",
    fields: [
      field("name", "Student name"),
      field("admission", "Admission number"),
      field("roll", "Roll number"),
      select("class", "Class", grades),
      select("section", "Section", sections),
      field("session", "Academic session"),
      field("admissionDate", "Admission date", "date"),
      field("dob", "Date of birth", "date"),
      select("gender", "Gender", ["Male", "Female"]),
      field("blood", "Blood group"),
      field("address", "Address"),
      field("phone", "Contact information"),
      field("father", "Father's name"),
      field("mother", "Mother's name"),
      field("parentPhone", "Parent contact"),
      field("parentEmail", "Parent email"),
      field("photo", "Photograph (demo file name)"),
      field("documents", "Documents (demo file names)"),
      field("history", "Academic history"),
      field("performance", "Academic performance"),
    ],
    seed: Array.from({ length: 520 }, (_, i) => ({
      name: names[i % names.length],
      admission: `ADM-${String(i + 1001)}`,
      roll: String((i % 45) + 1),
      class: grades[3 + (i % 12)],
      section: sections[i % 3],
      session: "2026–2027",
      admissionDate: "2026-04-01",
      dob: "2015-02-15",
      gender: i % 2 ? "Female" : "Male",
      blood: "O+",
      address: "Karachi, Pakistan",
      phone: "0300-0000000",
      father: "Muhammad Ali",
      mother: "Sara Ali",
      parentPhone: "0300-0000000",
      parentEmail: "parent@schooldemo.com",
      photo: "",
      documents: "",
      history: "Previous year completed",
      performance: "Good",
    })),
  },
  teachers: {
    title: "Teacher & Staff Management",
    description:
      "Profiles, class assignments, subjects, attendance, salaries and documents.",
    fields: [
      field("name", "Full name"),
      select("type", "Role", ["Teacher", "Staff"]),
      select("subject", "Subject", subjects),
      select("class", "Assigned class", grades),
      field("attendance", "Attendance"),
      field("salary", "Salary (PKR)", "number"),
      field("performance", "Performance"),
      field("documents", "Documents"),
    ],
    seed: Array.from({ length: 34 }, (_, i) => ({
      name: [
        "Ms. Amina Siddiqui",
        "Mr. Imran Ahmed",
        "Ms. Saira Khan",
        "Mr. Faisal Raza",
      ][i % 4],
      type: i < 30 ? "Teacher" : "Staff",
      subject: subjects[i % subjects.length],
      class: grades[3 + (i % 12)],
      attendance: "Present",
      salary: String(55000 + i * 900),
      performance: "Satisfactory",
      documents: "",
    })),
  },
  classes: {
    title: "Class & Section Management",
    description:
      "Create classes, sections, assign class teachers, subjects and capacity.",
    fields: [
      select("class", "Class", grades),
      select("section", "Section", sections),
      field("teacher", "Class teacher"),
      field("subjects", "Assigned subjects"),
      field("capacity", "Capacity", "number"),
      field("students", "Students enrolled", "number"),
    ],
    seed: Array.from({ length: 24 }, (_, i) => ({
      class: grades[3 + (Math.floor(i / 2) % 12)],
      section: sections[i % 2],
      teacher: ["Ms. Amina Siddiqui", "Mr. Imran Ahmed"][i % 2],
      subjects: "Mathematics, English, Science",
      capacity: "40",
      students: String(25 + (i % 12)),
    })),
  },
  subjects: {
    title: "Subject Management",
    description:
      "Subject codes, core/optional types, class and teacher assignments.",
    fields: [
      field("name", "Subject name"),
      field("code", "Subject code"),
      select("type", "Subject type", ["Core", "Optional"]),
      select("class", "Class", grades),
      field("teacher", "Assigned teacher"),
    ],
    seed: subjects.map((name, i) => ({
      name,
      code: `SUB-${String(i + 1).padStart(3, "0")}`,
      type: i < 7 ? "Core" : "Optional",
      class: "Grade 5",
      teacher: "Ms. Amina Siddiqui",
    })),
  },
  attendance: {
    title: "Attendance Management",
    description:
      "Daily, class-wise and student-wise attendance with reporting filters.",
    fields: [
      field("student", "Student name"),
      select("class", "Class", grades),
      select("section", "Section", sections),
      field("date", "Date", "date"),
      select("status", "Status", ["Present", "Absent", "Late", "Leave"]),
    ],
    seed: Array.from({ length: 130 }, (_, i) => ({
      student: names[i % names.length],
      class: grades[3 + (i % 12)],
      section: sections[i % 3],
      date: `2026-10-${String((i % 28) + 1).padStart(2, "0")}`,
      status: ["Present", "Present", "Present", "Absent", "Late", "Leave"][
        i % 6
      ],
    })),
  },
  fees: {
    title: "Fee & Finance Management",
    description:
      "Fee structures, vouchers, discounts, fines, payments and collections.",
    fields: [
      field("student", "Student"),
      select("class", "Class", grades),
      select("category", "Fee category", [
        "Tuition Fee",
        "Admission Fee",
        "Examination Fee",
        "Transport Fee",
        "Computer Fee",
        "Library Fee",
        "Miscellaneous Fee",
      ]),
      field("month", "Fee month"),
      field("amount", "Amount (PKR)", "number"),
      field("discount", "Discount (PKR)", "number"),
      field("fine", "Late fine (PKR)", "number"),
      field("due", "Due date", "date"),
      select("status", "Payment status", ["Unpaid", "Paid", "Overdue"]),
      field("voucher", "Voucher number"),
    ],
    seed: Array.from({ length: 115 }, (_, i) => ({
      student: names[i % names.length],
      class: grades[3 + (i % 12)],
      category: ["Tuition Fee", "Computer Fee", "Transport Fee"][i % 3],
      month: "October 2026",
      amount: String([8000, 1000, 2000][i % 3]),
      discount: i % 9 === 0 ? "500" : "0",
      fine: "0",
      due: "2026-10-20",
      status: i % 4 === 0 ? "Paid" : i % 7 === 0 ? "Overdue" : "Unpaid",
      voucher: `FEE-${10001 + i}`,
    })),
  },
  exams: {
    title: "Examination & Results",
    description:
      "Exam schedules, subject marks, grades, report cards and performance.",
    fields: [
      field("exam", "Exam title"),
      select("type", "Exam type", [
        "Midterm Examination",
        "Final Examination",
        "Monthly Test",
      ]),
      select("class", "Class", grades),
      select("subject", "Subject", subjects),
      field("date", "Exam date", "date"),
      field("student", "Student"),
      field("roll", "Roll number"),
      field("total", "Total marks", "number"),
      field("obtained", "Obtained marks", "number"),
      field("remarks", "Teacher remarks"),
      select("status", "Result status", ["Draft", "Published"]),
    ],
    seed: Array.from({ length: 28 }, (_, i) => ({
      exam: "October Assessment",
      type: "Monthly Test",
      class: grades[3 + (i % 12)],
      subject: subjects[i % subjects.length],
      date: "2026-10-25",
      student: names[i % names.length],
      roll: String(i + 1),
      total: "100",
      obtained: String(60 + (i % 37)),
      remarks: "Good effort",
      status: i % 3 === 0 ? "Published" : "Draft",
    })),
  },
  timetable: {
    title: "Timetable Management",
    description:
      "Weekly class and teacher timetables, periods and break times.",
    fields: [
      select("class", "Class", grades),
      select("section", "Section", sections),
      select("day", "Day", [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ]),
      field("period", "Period"),
      field("start", "Start time"),
      field("end", "End time"),
      select("subject", "Subject", subjects),
      field("teacher", "Teacher"),
      select("type", "Type", ["Lesson", "Break"]),
    ],
    seed: Array.from({ length: 42 }, (_, i) => ({
      class: grades[3 + (i % 12)],
      section: sections[i % 3],
      day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
        i % 6
      ],
      period: String((i % 7) + 1),
      start: "09:00",
      end: "09:45",
      subject: subjects[i % subjects.length],
      teacher: "Ms. Amina Siddiqui",
      type: i % 7 === 3 ? "Break" : "Lesson",
    })),
  },
  announcements: {
    title: "Announcements & Communication",
    description:
      "School notices, class announcements, exam, fee and event reminders.",
    fields: [
      field("title", "Announcement title"),
      field("message", "Message", "textarea"),
      select("audience", "Audience", [
        "All",
        "Parents",
        "Teachers",
        "Students",
        "Class-wise",
      ]),
      select("category", "Category", [
        "General",
        "Exam",
        "Fee Reminder",
        "Event",
      ]),
      field("date", "Date", "date"),
    ],
    seed: Array.from({ length: 23 }, (_, i) => ({
      title: ["School Notice", "Exam Reminder", "Fee Reminder", "School Event"][
        i % 4
      ],
      message: "Please check the school calendar for further details.",
      audience: ["All", "Parents", "Teachers", "Students"][i % 4],
      category: ["General", "Exam", "Fee Reminder", "Event"][i % 4],
      date: "2026-10-31",
    })),
  },
  calendar: {
    title: "School Events & Calendar",
    description:
      "Holidays, parent-teacher meetings, examinations, sports and academic events.",
    fields: [
      field("title", "Event title"),
      select("type", "Event type", [
        "Holiday",
        "Parent-Teacher Meeting",
        "Examination",
        "School Function",
        "Sports Day",
        "Academic Event",
      ]),
      field("date", "Date", "date"),
      field("description", "Description", "textarea"),
    ],
    seed: [
      {
        title: "Parent-Teacher Meeting",
        type: "Parent-Teacher Meeting",
        date: "2026-11-12",
        description: "School meeting",
      },
      {
        title: "Sports Day",
        type: "Sports Day",
        date: "2026-11-20",
        description: "Annual sports day",
      },
    ],
  },
  transport: {
    title: "Transport Management",
    description:
      "School vehicles, drivers, routes, assigned students and transport fees.",
    fields: [
      field("vehicle", "Vehicle"),
      field("driver", "Driver"),
      field("route", "Route"),
      field("student", "Assigned student"),
      field("fee", "Transport fee (PKR)", "number"),
    ],
    seed: [
      {
        vehicle: "BUS-01",
        driver: "Muhammad Aslam",
        route: "North Nazimabad",
        student: "Ahmed Ali",
        fee: "2000",
      },
      {
        vehicle: "VAN-02",
        driver: "Sajid Khan",
        route: "Gulshan-e-Iqbal",
        student: "Ayesha Khan",
        fee: "2500",
      },
    ],
  },
  reports: {
    title: "Reports & Analytics",
    description:
      "Enrollment, attendance, fees, academic performance, teacher and class reports.",
    fields: [],
    seed: [],
  },
};
export const reportTypes = [
  "Student Enrollment Report",
  "Attendance Report",
  "Fee Collection Report",
  "Pending Fee Report",
  "Academic Performance Report",
  "Examination Results",
  "Teacher Reports",
  "Class-wise Reports",
];
