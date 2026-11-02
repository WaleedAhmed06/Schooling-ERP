import { LogOut } from "lucide-react";
export function SidebarFooter({ onSignOut }: { onSignOut: () => void }) {
  return (
    <div className="sidebar-bottom">
      <div className="phase-note">
        <span className="phase-note-dot" />
        <div>
          <strong>Phase 2 · Admin Portal</strong>
          <small>Admin modules available · other portals follow</small>
        </div>
      </div>
      <button type="button" className="sidebar-logout" onClick={onSignOut}>
        <LogOut size={18} />
        <span>Sign out</span>
      </button>
    </div>
  );
}
