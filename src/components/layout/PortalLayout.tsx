"use client";
import { useState } from "react";
import type { ReactNode } from "react";
import type { Role } from "@/types/domain";
import { AppSidebar } from "./sidebar/AppSidebar";
import { AppHeader } from "./header/AppHeader";
import { AssistantWidget } from "@/features/assistant/components/AssistantWidget";
export function PortalLayout({
  role,
  current,
  title,
  onSwitch,
  onSignOut,
  children,
}: {
  role: Role;
  current: string;
  title: string;
  onSwitch: (role: Role) => void;
  onSignOut: () => void;
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={`app-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      <div
        className={`mobile-overlay ${mobileOpen ? "visible" : ""}`}
        onClick={() => setMobileOpen(false)}
      />
      <AppSidebar
        role={role}
        current={current}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onSignOut={onSignOut}
      />
      <div className="app-content">
        <AppHeader
          role={role}
          title={title}
          onMenu={() => setMobileOpen(true)}
          onCollapse={() => setCollapsed((v) => !v)}
          onSwitch={onSwitch}
          onSignOut={onSignOut}
        />
        <main className="page-main">{children}</main>
        <AssistantWidget role={role} />
        <footer className="app-footer">
          <span>© 2026 School ERP · Frontend Demo</span>
          <span>Academic Session 2026–2027</span>
        </footer>
      </div>
    </div>
  );
}
