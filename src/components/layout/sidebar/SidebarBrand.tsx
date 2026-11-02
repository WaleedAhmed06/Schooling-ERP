import Link from "next/link";
import { GraduationCap, X } from "lucide-react";
import type { Role } from "@/types/domain";
export function SidebarBrand({
  role,
  onClose,
}: {
  role: Role;
  onClose: () => void;
}) {
  return (
    <div className="sidebar-head">
      <Link href={`/${role}`} className="brand">
        <span className="brand-logo">
          <GraduationCap size={23} />
        </span>
        <span className="brand-text">
          School<span className="brand-accent">ERP</span>
        </span>
      </Link>
      <button
        type="button"
        className="sidebar-close"
        onClick={onClose}
        aria-label="Close sidebar"
      >
        <X size={19} />
      </button>
    </div>
  );
}
