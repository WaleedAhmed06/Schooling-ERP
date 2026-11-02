import type { Role } from "@/types/domain";
import { navigation } from "@/config/navigation";
import { SidebarNavItem } from "./SidebarNavItem";
export function SidebarNavigation({
  role,
  current,
  onNavigate,
}: {
  role: Role;
  current: string;
  onNavigate: () => void;
}) {
  return (
    <>
      <div className="nav-label">WORKSPACE</div>
      <nav className="sidebar-nav" aria-label={`${role} navigation`}>
        {navigation[role].map((item) => (
          <SidebarNavItem
            key={item.slug}
            role={role}
            item={item}
            active={item.slug === current}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </>
  );
}
