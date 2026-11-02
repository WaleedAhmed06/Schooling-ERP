import Link from "next/link";
import { ChevronRight, Settings2 } from "lucide-react";
import type { Role } from "@/types/domain";
import { navigation } from "@/config/navigation";
import { Dashboard } from "@/features/dashboard/components/dashboard";
import { StudentManagement } from "@/features/students/components/StudentManagement";
import { StudentPortal } from "@/features/student/components/StudentPortal";
import { ParentPortal } from "@/features/parent/components/ParentPortal";
import { TeacherPortal } from "@/features/teacher/components/TeacherPortal";
import { AdminModule } from "@/features/admin/admin-module";
export function PortalContent({
  role,
  current,
  title,
  detail,
  query,
}: {
  role: Role;
  current: string;
  title: string;
  detail?: string;
  query?: string;
}) {
  const active = navigation[role].find((item) => item.slug === current);
  if (role === "student")
    return <StudentPortal section={current} detail={detail} query={query} />;
  if (role === "parent") return <ParentPortal section={current} />;
  if (!current) return <Dashboard role={role} />;
  if (role === "teacher" && active?.phase === 3)
    return <TeacherPortal section={current} />;
  if (role === "admin" && current === "students") return <StudentManagement />;
  if (role === "admin" && active?.phase === 2)
    return <AdminModule slug={current} />;
  return (
    <div className="placeholder-wrap">
      <div className="placeholder-icon">
        <Settings2 size={30} />
      </div>
      <span className="eyebrow">PLANNED FOR PHASE {active?.phase ?? "—"}</span>
      <h1>{title}</h1>
      <p>
        This module is included in the School ERP requirements and will be
        implemented in its assigned phase.
      </p>
      <Link className="back-link" href={`/${role}`}>
        Return to dashboard <ChevronRight size={17} />
      </Link>
    </div>
  );
}
