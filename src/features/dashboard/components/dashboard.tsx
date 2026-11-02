"use client";
import {
  GraduationCap,
  Users,
  School,
  ClipboardCheck,
  Wallet,
  CalendarDays,
  NotebookPen,
  ChartColumn,
  ArrowUpRight,
  ArrowRight,
  Clock3,
  CalendarCheck,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  MoreHorizontal,
  Bell,
  FileCheck,
  Info,
} from "lucide-react";
import Link from "next/link";
import type { DashboardMetric, Role } from "@/types/domain";
import {
  announcements,
  attendanceOverview,
  enrollment,
  metrics,
  students,
} from "@/data/seeds/dashboard";
import { demoUsers, roleTitles } from "@/config/roles";
import { Card } from "@/components/ui/card";
const metricIcons: Record<DashboardMetric["icon"], React.ElementType> = {
  students: GraduationCap,
  teachers: Users,
  classes: School,
  attendance: ClipboardCheck,
  fees: Wallet,
  calendar: CalendarDays,
  assignments: NotebookPen,
  results: ChartColumn,
};
const descriptions: Record<Role, string> = {
  admin: "Here's what's happening across your school today.",
  teacher: "Here's your teaching overview and what's coming up.",
  parent: "Stay connected with your children's school journey.",
  student: "Let's make today a great day of learning.",
};
const quickLinks: Record<
  Role,
  { label: string; slug: string; icon: React.ElementType }[]
> = {
  admin: [
    { label: "Add student", slug: "students", icon: GraduationCap },
    { label: "Mark attendance", slug: "attendance", icon: ClipboardCheck },
    { label: "Fee management", slug: "fees", icon: Wallet },
    { label: "Create announcement", slug: "announcements", icon: Bell },
  ],
  teacher: [
    { label: "My classes", slug: "classes", icon: School },
    { label: "Mark attendance", slug: "attendance", icon: ClipboardCheck },
    { label: "New assignment", slug: "assignments", icon: NotebookPen },
    { label: "Enter marks", slug: "exams", icon: FileCheck },
  ],
  parent: [
    { label: "My children", slug: "children", icon: Users },
    { label: "Fee payments", slug: "fees", icon: Wallet },
    { label: "Attendance", slug: "attendance", icon: ClipboardCheck },
    { label: "Results", slug: "results", icon: ChartColumn },
  ],
  student: [
    { label: "My subjects", slug: "courses", icon: BookOpen },
    { label: "Assignments", slug: "assignments", icon: NotebookPen },
    { label: "Study materials", slug: "materials", icon: BookOpen },
    { label: "Quizzes", slug: "quizzes", icon: FileCheck },
  ],
};
export function Dashboard({ role }: { role: Role }) {
  const user = demoUsers[role];
  const first = user.name.split(" ")[0];
  return (
    <div className="dashboard">
      <div className="page-heading">
        <div>
          <div className="eyebrow">ACADEMIC SESSION 2026–2027</div>
          <h1>
            Good morning, {first} <span className="wave">👋</span>
          </h1>
          <p>{descriptions[role]}</p>
        </div>
        <div className="date-chip">
          <CalendarDays size={17} /> Saturday, October 31, 2026
        </div>
      </div>
      <div className="welcome-banner">
        <div className="welcome-copy">
          <span className="welcome-pill">
            YOUR {roleTitles[role].toUpperCase()} PORTAL
          </span>
          <h2>Everything you need, all in one place.</h2>
          <p>
            Explore your school dashboard and switch between demo portals to see
            the connected experience.
          </p>
          <div className="welcome-tag">
            <CheckCircle2 size={15} /> Interactive school demo
          </div>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <div className="art-circle art-one" />
          <div className="art-circle art-two" />
          <div className="art-main">
            <GraduationCap size={78} strokeWidth={1.4} />
          </div>
          <div className="art-star art-star-1">✦</div>
          <div className="art-star art-star-2">✧</div>
        </div>
      </div>
      <div className="metrics-grid">
        {metrics[role].map((metric, index) => {
          const Icon = metricIcons[metric.icon];
          return (
            <Card key={metric.label} className="metric-card">
              <div className="metric-top">
                <span className={`metric-icon metric-${index}`}>
                  <Icon size={22} />
                </span>
                <span className="metric-dots">
                  <MoreHorizontal size={19} />
                </span>
              </div>
              <span className="metric-label">{metric.label}</span>
              <div className="metric-value">{metric.value}</div>
              <span className="metric-foot">
                {metric.change ? (
                  <>
                    <TrendingUp size={14} /> {metric.change}
                  </>
                ) : (
                  "Current overview"
                )}
              </span>
            </Card>
          );
        })}
      </div>
      <div className="dashboard-grid">
        <Card className="chart-card">
          <div className="section-heading">
            <div>
              <h3>
                {role === "admin" ? "Student Enrollment" : "Activity Overview"}
              </h3>
              <p>
                {role === "admin"
                  ? "Monthly enrollment trends"
                  : "Illustrative activity across recent months"}
              </p>
            </div>
            <span className="chart-period">Last 7 months</span>
          </div>
          <div className="bar-chart">
            <div className="chart-lines">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>
            <div className="bars-area">
              {enrollment.map((item, i) => (
                <div className="bar-column" key={item.label}>
                  <div className="bar-track">
                    <div
                      className={`bar-fill ${i === 5 ? "highlight" : ""}`}
                      style={{ height: `${item.value}%` }}
                      title={`${item.label}: ${item.value}`}
                    />
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card className="attendance-card">
          <div className="section-heading">
            <div>
              <h3>Attendance Overview</h3>
              <p>School-wide attendance snapshot</p>
            </div>
            <span className="section-icon">
              <ClipboardCheck size={18} />
            </span>
          </div>
          <div className="donut-wrap">
            <div className="donut">
              <div className="donut-inner">
                <strong>94.8%</strong>
                <span>Present</span>
              </div>
            </div>
          </div>
          <div className="attendance-legend">
            {attendanceOverview.map((item) => (
              <div key={item.label}>
                <span className="legend-name">
                  <i style={{ background: item.color }} />
                  {item.label}
                </span>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="dashboard-grid lower-grid">
        <Card className="activity-card">
          <div className="section-heading">
            <div>
              <h3>Recent Announcements</h3>
              <p>Latest updates from your school</p>
            </div>
            <span className="section-icon">
              <Bell size={18} />
            </span>
          </div>
          <div className="activity-list">
            {announcements
              .filter((a) => a.audience.includes(role))
              .map((a, i) => (
                <div className="activity-row" key={a.id}>
                  <div className={`activity-icon activity-${i}`}>
                    <Bell size={17} />
                  </div>
                  <div>
                    <strong>{a.title}</strong>
                    <p>{a.description}</p>
                    <small>{a.date}</small>
                  </div>
                </div>
              ))}
          </div>
        </Card>
        <Card className="quick-card">
          <div className="section-heading">
            <div>
              <h3>Quick Access</h3>
              <p>Jump to your frequently used modules</p>
            </div>
            <span className="section-icon">
              <ArrowUpRight size={18} />
            </span>
          </div>
          <div className="quick-grid">
            {quickLinks[role].map((q) => (
              <Link
                key={q.slug}
                href={`/${role}/${q.slug}`}
                className="quick-item"
              >
                <span>
                  <q.icon size={21} />
                </span>
                <strong>{q.label}</strong>
                <ArrowRight size={15} />
              </Link>
            ))}
          </div>
          <div className="demo-callout">
            <Info size={18} />
            <p>Explore each module using the demo data and role switcher.</p>
          </div>
        </Card>
      </div>
      {role === "admin" && (
        <Card className="student-snapshot">
          <div className="section-heading">
            <div>
              <h3>Student Snapshot</h3>
              <p>Illustrative records for the demo foundation</p>
            </div>
            <Link href="/admin/students" className="view-all">
              View students <ArrowRight size={15} />
            </Link>
          </div>
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>STUDENT</th>
                  <th>ROLL NO.</th>
                  <th>CLASS</th>
                  <th>SECTION</th>
                  <th>ATTENDANCE</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={s.id}>
                    <td>
                      <div className="table-person">
                        <span className={`table-avatar table-avatar-${i}`}>
                          {s.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                        <strong>{s.name}</strong>
                      </div>
                    </td>
                    <td>{s.rollNumber}</td>
                    <td>{s.className}</td>
                    <td>{s.section}</td>
                    <td>
                      <span
                        className={`status status-${s.attendance.toLowerCase()}`}
                      >
                        {s.attendance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
