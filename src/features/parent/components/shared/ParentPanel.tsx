import type { ReactNode } from "react";
export function ParentPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="parent-panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
export function ParentPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="parent-page">
      <div className="parent-page-head">
        <span className="eyebrow">PARENT PORTAL</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
