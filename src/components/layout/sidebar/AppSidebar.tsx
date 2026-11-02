import type { Role } from "@/types/domain";
import { SidebarBrand } from "./SidebarBrand";
import { SchoolInformation } from "./SchoolInformation";
import { SidebarNavigation } from "./SidebarNavigation";
import { SidebarFooter } from "./SidebarFooter";
export function AppSidebar({
  role,
  current,
  mobileOpen,
  onClose,
  onSignOut,
}: {
  role: Role;
  current: string;
  mobileOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
}) {
  return (
    <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
      <SidebarBrand role={role} onClose={onClose} />
      <SchoolInformation />
      <SidebarNavigation role={role} current={current} onNavigate={onClose} />
      <SidebarFooter onSignOut={onSignOut} />
    </aside>
  );
}
