"use client";
import { Bell, ChevronRight, Menu, PanelLeftClose } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Role } from "@/types/domain";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { HeaderSearch } from "./HeaderSearch";
import { RoleSwitcher } from "./RoleSwitcher";
export function AppHeader({
  role,
  title,
  onMenu,
  onCollapse,
  onSwitch,
  onSignOut,
}: {
  role: Role;
  title: string;
  onMenu: () => void;
  onCollapse: () => void;
  onSwitch: (role: Role) => void;
  onSignOut: () => void;
}) {
  const router = useRouter();
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="icon-button mobile-menu"
          onClick={onMenu}
          aria-label="Open navigation"
        >
          <Menu size={21} />
        </button>
        <button
          className="icon-button desktop-collapse"
          onClick={onCollapse}
          aria-label="Toggle sidebar"
        >
          <PanelLeftClose size={20} />
        </button>
        <div className="topbar-breadcrumb">
          <span>Workspace</span>
          <ChevronRight size={14} />
          <strong>{title}</strong>
        </div>
      </div>
      <div className="topbar-actions">
        <HeaderSearch role={role} />
        <ThemeToggle />
        <button
          className="icon-button notification-button"
          title="Notifications"
          aria-label="Notifications"
          onClick={() => router.push(`/${role}/notifications`)}
        >
          <Bell size={20} />
          <span className="notification-dot" />
        </button>
        <RoleSwitcher role={role} onSwitch={onSwitch} onSignOut={onSignOut} />
      </div>
    </header>
  );
}
