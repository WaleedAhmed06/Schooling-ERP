"use client";
import type { ExamMark } from "@/features/teacher/types/teacher.types";
import { downloadPdf } from "../../utils/pdf";
export function ReportCard({
  studentName,
  rollNumber,
  className,
  marks,
}: {
  studentName: string;
  rollNumber: string;
  className: string;
  marks: ExamMark[];
}) {
  const total = marks.reduce((a, m) => a + m.total, 0);
  const obtained = marks.reduce((a, m) => a + m.marks, 0);
  const pct = total ? (obtained / total) * 100 : 0;
  const grade =
    pct >= 80 ? "A" : pct >= 70 ? "B" : pct >= 60 ? "C" : pct >= 50 ? "D" : "F";
  return (
    <>
      <p>
        {studentName} · Roll {rollNumber} · {className}
      </p>
      {marks.length ? (
        <>
          <table className="teacher-table">
            <thead>
              <tr>
                <th>Exam</th>
                <th>Subject</th>
                <th>Obtained</th>
                <th>Total</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((m) => (
                <tr key={m.id}>
                  <td>{m.exam}</td>
                  <td>{m.subject}</td>
                  <td>{m.marks}</td>
                  <td>{m.total}</td>
                  <td>{m.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            Total: {obtained}/{total} · {pct.toFixed(1)}% · Grade: {grade}
          </p>
          <button
            type="button"
            onClick={() =>
              downloadPdf(
                `report-${rollNumber}.pdf`,
                "SCHOOL ERP - REPORT CARD",
                [
                  `Student: ${studentName}`,
                  `Roll: ${rollNumber}`,
                  `Class: ${className}`,
                  ...marks.map(
                    (m) =>
                      `${m.exam} | ${m.subject}: ${m.marks}/${m.total} | ${m.remarks}`,
                  ),
                  `Total: ${obtained}/${total}`,
                  `Percentage: ${pct.toFixed(1)}%`,
                  `Grade: ${grade}`,
                ],
              )
            }
          >
            Download Report Card (PDF)
          </button>
        </>
      ) : (
        <p>
          No published results yet. Teacher marks are visible once submitted.
        </p>
      )}
    </>
  );
}
