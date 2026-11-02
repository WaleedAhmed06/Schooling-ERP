import type { ReactNode } from "react";
export function StudentPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="lms-page">
      <header className="lms-page-header">
        <span className="eyebrow">STUDENT · MINI LMS</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      {children}
    </section>
  );
}
export function StudentPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="lms-panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
export function StudentEmpty({ children }: { children: ReactNode }) {
  return <p className="lms-empty">{children}</p>;
}
