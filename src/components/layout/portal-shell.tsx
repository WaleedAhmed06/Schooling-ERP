"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Role } from "@/types/domain";
import { roles, roleTitles } from "@/config/roles";
import { navigation } from "@/config/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { PortalLayout } from "./PortalLayout";
import { PortalContent } from "@/features/portal/components/PortalContent";
export function PortalShell({
  routeRole,
  slug = [],
}: {
  routeRole: string;
  slug?: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("lesson") ?? searchParams.get("quiz") ?? undefined;
  const role = useAuthStore((s) => s.role);
  const hydrated = useAuthStore((s) => s.hydrated);
  const switchRole = useAuthStore((s) => s.switchRole);
  const logout = useAuthStore((s) => s.logout);
  const valid = roles.includes(routeRole as Role);
  const portal = routeRole as Role;
  useEffect(() => {
    if (!hydrated) return;
    if (!role) router.replace("/login");
    else if (!valid || role !== portal) router.replace(`/${role}`);
  }, [hydrated, role, portal, valid, router]);
  if (!hydrated || !role || !valid || role !== portal)
    return (
      <div className="loading-screen">
        <span className="loading-spinner" /> Loading your portal...
      </div>
    );
  const current = slug[0] ?? "";
  const active = navigation[portal].find((item) => item.slug === current);
  const title = current
    ? (active?.label ?? "Not Found")
    : `${roleTitles[portal]} Dashboard`;
  function onSwitch(next: Role) {
    switchRole(next);
    router.push(`/${next}`);
  }
  function onSignOut() {
    logout();
    router.replace("/login");
  }
  return (
    <PortalLayout
      key={portal}
      role={portal}
      current={current}
      title={title}
      onSwitch={onSwitch}
      onSignOut={onSignOut}
    >
      <PortalContent
        role={portal}
        current={current}
        title={title}
        detail={slug[1]}
        query={query}
      />
    </PortalLayout>
  );
}
