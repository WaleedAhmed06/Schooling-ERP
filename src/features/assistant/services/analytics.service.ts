import type { Role } from "@/types/domain";
import { teacherService } from "@/features/teacher/services/teacher.service";
import { parentRepository } from "@/features/parent/services/parent.service";
import type { AiSnapshot, Insight } from "../types/ai.types";
/** Derived exclusively from locally available mock data. No cross-user server queries. */
export function getAiSnapshot(role: Role): AiSnapshot {
  const t = teacherService.read(),
    p = parentRepository.load();
  const published = t.assignments.filter((a) => a.status === "Published");
  const pendingFees = p.vouchers.filter((v) => v.status === "Pending");
  const feeAmount = pendingFees.reduce(
    (n, v) => n + v.tuition + v.computer + v.transport - v.discount,
    0,
  );
  const absent = t.attendance.filter((a) => a.status === "Absent");
  const late = t.attendance.filter((a) => a.status === "Late");
  const graded = t.submissions.filter((s) => s.reviewed);
  const ungraded = t.submissions.filter((s) => !s.reviewed);
  const publishedMarks = t.marks.filter((m) => m.submitted);
  const metrics: Record<string, number> = {};
  const insights: Insight[] = [];
  const add = (
    id: string,
    title: string,
    detail: string,
    severity: Insight["severity"],
    source: string,
    metric?: string,
    action?: string,
  ) => insights.push({ id, title, detail, severity, source, metric, action });
  if (role === "admin") {
    Object.assign(metrics, {
      classes: t.classes.length,
      attendanceRecords: t.attendance.length,
      absences: absent.length,
      lateArrivals: late.length,
      pendingVouchers: pendingFees.length,
      outstandingPKR: feeAmount,
      publishedResults: publishedMarks.length,
    });
    add(
      "fees",
      "Outstanding fee vouchers",
      `${pendingFees.length} pending voucher(s), totaling PKR ${feeAmount.toLocaleString("en-PK")}.`,
      pendingFees.length ? "warning" : "info",
      "Parent fee repository",
      String(pendingFees.length),
      "fees",
    );
    add(
      "attendance",
      "Recorded absences",
      `${absent.length} absence(s) in the available attendance records.`,
      absent.length ? "warning" : "info",
      "Teacher attendance repository",
      String(absent.length),
      "attendance",
    );
    add(
      "exams",
      "Published result entries",
      `${publishedMarks.length} published marks record(s).`,
      "info",
      "Teacher marks repository",
      String(publishedMarks.length),
      "exams",
    );
  } else if (role === "teacher") {
    Object.assign(metrics, {
      assignedClasses: t.classes.length,
      publishedAssignments: published.length,
      ungradedSubmissions: ungraded.length,
      gradedSubmissions: graded.length,
      absences: absent.length,
    });
    add(
      "grading",
      "Submissions awaiting review",
      `${ungraded.length} submission(s) are waiting for grading.`,
      ungraded.length ? "warning" : "info",
      "Teacher submissions",
      String(ungraded.length),
      "assignments",
    );
    add(
      "attendance",
      "Attendance exceptions",
      `${absent.length} absent and ${late.length} late record(s) in the demo dataset.`,
      absent.length ? "warning" : "info",
      "Teacher attendance",
      String(absent.length),
      "attendance",
    );
  } else if (role === "parent") {
    // The parent demo repository is scoped to the currently seeded parent account.
    Object.assign(metrics, {
      pendingVouchers: pendingFees.length,
      outstandingPKR: feeAmount,
      schoolMessages: p.messages.length,
      calendarEvents: p.events.length,
    });
    add(
      "fees",
      "Family fee summary",
      `${pendingFees.length} pending voucher(s); PKR ${feeAmount.toLocaleString("en-PK")} outstanding in the demo account.`,
      pendingFees.length ? "warning" : "info",
      "Parent vouchers",
      String(pendingFees.length),
      "fees",
    );
    add(
      "messages",
      "School communication",
      `${p.messages.length} message(s) in the parent demo account.`,
      "info",
      "Parent messages",
      String(p.messages.length),
      "communication",
    );
  } else {
    // Do not expose class-wide or parent fee data to the student.
    const studentId = "s1";
    const studentClasses = t.classes
      .filter((c) => c.studentIds.includes(studentId))
      .map((c) => c.id);
    const ownAssignments = published.filter((a) =>
      studentClasses.includes(a.classId),
    );
    const ownSubmissions = t.submissions.filter(
      (s) => s.studentId === studentId,
    );
    const ownResults = publishedMarks.filter((m) => m.studentId === studentId);
    const pending = ownAssignments.filter(
      (a) => !ownSubmissions.some((s) => s.assignmentId === a.id),
    );
    Object.assign(metrics, {
      assignedHomework: ownAssignments.length,
      pendingHomework: pending.length,
      submittedHomework: ownSubmissions.length,
      publishedResults: ownResults.length,
    });
    add(
      "homework",
      "Homework to complete",
      `${pending.length} published assignment(s) have no submission in this demo account.`,
      pending.length ? "warning" : "info",
      "Teacher assignments and submissions",
      String(pending.length),
      "assignments",
    );
    add(
      "results",
      "Available examination results",
      `${ownResults.length} published result record(s).`,
      "info",
      "Teacher published marks",
      String(ownResults.length),
      "results",
    );
  }
  return {
    role,
    generatedAt: new Date().toISOString(),
    metrics,
    insights,
    summary: `${insights.length} explainable insights generated from local demo records. No predictive model or external AI service was used.`,
  };
}
