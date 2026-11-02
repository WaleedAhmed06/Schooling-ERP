import type { ReactNode } from "react";
export function TeacherPageFrame({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="teacher-page">
      <div className="teacher-page-heading">
        <span className="eyebrow">TEACHER PORTAL</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}
export function TeacherPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="teacher-panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
