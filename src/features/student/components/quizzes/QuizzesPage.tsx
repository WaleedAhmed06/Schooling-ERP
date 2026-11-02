"use client";
import { quizzes } from "../../data/student.seed";
import { useStudentPortal } from "../../hooks/useStudentPortal";
import { StudentPage, StudentPanel } from "../shared/StudentLayout";
import { QuizPlayer } from "./QuizPlayer";
export function QuizzesPage({ selected }: { selected?: string }) {
  const { progress } = useStudentPortal();
  const quiz = quizzes.find((q) => q.id === selected);
  return (
    <StudentPage
      title="Quizzes & Tests"
      description="Practice with timed multiple-choice and true/false questions."
    >
      {quiz ? (
        <QuizPlayer key={quiz.id} quiz={quiz} />
      ) : (
        <StudentPanel title="Available Quizzes">
          {quizzes.map((q) => (
            <div key={q.id} className="lms-list-item">
              <strong>{q.title}</strong>
              <span>
                {q.subject} · {q.questions.length} questions
              </span>
              <span>
                Attempts:{" "}
                {progress.attempts.filter((a) => a.quizId === q.id).length}
              </span>
              <a href={`/student/quizzes?quiz=${q.id}`}>Start quiz →</a>
            </div>
          ))}
        </StudentPanel>
      )}
    </StudentPage>
  );
}
