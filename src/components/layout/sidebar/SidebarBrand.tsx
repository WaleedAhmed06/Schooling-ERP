import Link from "next/link";
import { X } from "lucide-react";
import { BrandLogo } from "@/components/shared/brand-logo";
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
        <BrandLogo />
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
