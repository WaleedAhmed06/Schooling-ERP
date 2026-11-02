"use client";
import { useEffect, useState } from "react";
import type { Quiz } from "../../types/student.types";
import { useStudentStore } from "../../stores/student.store";
export function QuizPlayer({ quiz }: { quiz: Quiz }) {
  const submit = useStudentStore((s) => s.submitQuiz),
    studentId = useStudentStore((s) => s.studentId);
  const [remaining, setRemaining] = useState(quiz.durationSeconds),
    [answers, setAnswers] = useState<Record<string, number>>({}),
    [started, setStarted] = useState(false),
    [result, setResult] = useState<number | null>(null);
  function finish() {
    if (result !== null) return;
    const score = quiz.questions.filter(
      (q) => answers[q.id] === q.correct,
    ).length;
    submit({
      quizId: quiz.id,
      studentId,
      answers,
      score,
      total: quiz.questions.length,
      submittedAt: new Date().toISOString(),
    });
    setResult(score);
    setStarted(false);
  }
  useEffect(() => {
    if (!started || result !== null) return;
    const timer = window.setInterval(
      () => setRemaining((s) => Math.max(0, s - 1)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [started, result]);
  useEffect(() => {
    if (started && remaining === 0) finish();
  }, [remaining, started]);
  if (result !== null)
    return (
      <div className="lms-panel">
        <h2>Quiz Submitted</h2>
        <p>
          Score: {result}/{quiz.questions.length} (
          {Math.round((result / quiz.questions.length) * 100)}%)
        </p>
        <p>Review your results in Results & Performance.</p>
      </div>
    );
  if (!started)
    return (
      <div className="lms-panel">
        <h2>{quiz.title}</h2>
        <p>
          {quiz.questions.length} questions ·{" "}
          {Math.round(quiz.durationSeconds / 60)} minutes
        </p>
        <button onClick={() => setStarted(true)}>Start Quiz</button>
      </div>
    );
  return (
    <form
      className="lms-panel lms-stack"
      onSubmit={(e) => {
        e.preventDefault();
        finish();
      }}
    >
      <div className="lms-row">
        <h2>{quiz.title}</h2>
        <strong>
          Time remaining: {Math.floor(remaining / 60)}:
          {String(remaining % 60).padStart(2, "0")}
        </strong>
      </div>
      {quiz.questions.map((q, i) => (
        <fieldset key={q.id} className="lms-question">
          <legend>
            {i + 1}. {q.prompt}
          </legend>
          {q.options.map((option, j) => (
            <label key={j}>
              <input
                type="radio"
                name={q.id}
                checked={answers[q.id] === j}
                onChange={() => setAnswers((p) => ({ ...p, [q.id]: j }))}
              />
              {option}
            </label>
          ))}
        </fieldset>
      ))}
      <button type="submit">Submit Quiz</button>
    </form>
  );
}
