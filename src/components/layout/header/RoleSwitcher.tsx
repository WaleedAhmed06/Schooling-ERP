"use client";
import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { demoUsers, roleTitles, roles } from "@/config/roles";
import type { Role } from "@/types/domain";
export function RoleSwitcher({
  role,
  onSwitch,
  onSignOut,
}: {
  role: Role;
  onSwitch: (role: Role) => void;
  onSignOut: () => void;
}) {
  const [open, setOpen] = useState(false);
  const user = demoUsers[role];
  return (
    <div className="role-menu">
      <button
        type="button"
        className="user-button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Switch demo role"
      >
        <span className="user-avatar">{user.initials}</span>
        <span className="user-info">
          <strong>{user.name}</strong>
          <small>{roleTitles[role]}</small>
        </span>
        <ChevronDown size={15} />
      </button>
      {open && (
        <div className="role-popover">
          <div className="role-popover-title">SWITCH DEMO PORTAL</div>
          {roles.map((next) => (
            <button
              type="button"
              key={next}
              className={next === role ? "role-active" : ""}
              onClick={() => {
                setOpen(false);
                onSwitch(next);
              }}
            >
              <span className="role-avatar">{demoUsers[next].initials}</span>
              <span>
                <strong>{roleTitles[next]}</strong>
                <small>{demoUsers[next].email}</small>
              </span>
              {next === role && <span className="role-current">Current</span>}
            </button>
          ))}
          <div className="role-popover-divider" />
          <button type="button" onClick={onSignOut}>
            <LogOut size={16} /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}
