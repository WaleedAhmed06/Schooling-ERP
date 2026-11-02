import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import type { Role } from "@/types/domain";
import type { NavItem } from "@/config/navigation";
import { navigationIcons } from "./navigation-icons";
export function SidebarNavItem({
  role,
  item,
  active,
  onNavigate,
}: {
  role: Role;
  item: NavItem;
  active: boolean;
  onNavigate: () => void;
}) {
  const Icon =
    navigationIcons[item.icon as keyof typeof navigationIcons] ??
    LayoutDashboard;
  return (
    <Link
      href={`/${role}${item.slug ? `/${item.slug}` : ""}`}
      onClick={onNavigate}
      className={`nav-link ${active ? "active" : ""}`}
      aria-current={active ? "page" : undefined}
      title={item.label}
    >
      <Icon size={19} />
      <span>{item.label}</span>
      {item.phase > 1 && <span className="nav-phase">P{item.phase}</span>}
    </Link>
  );
}
