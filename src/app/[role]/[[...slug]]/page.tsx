import { Suspense } from "react";
import { PortalShell } from "@/components/layout/portal-shell";
import { navigation } from "@/config/navigation";
import { roles } from "@/config/roles";
import { subjects } from "@/features/student/data/student.seed";

export function generateStaticParams() {
  return [
    ...roles.flatMap((role) =>
      navigation[role].map((item) => ({
        role,
        slug: item.slug ? [item.slug] : [],
      })),
    ),
    ...subjects.map((subject) => ({
      role: "student",
      slug: ["courses", subject.toLowerCase().replaceAll(" ", "-")],
    })),
  ];
}

export default async function PortalPage({
  params,
}: {
  params: Promise<{ role: string; slug?: string[] }>;
}) {
  const { role, slug } = await params;
  return (
    <Suspense
      fallback={<div className="loading-screen">Loading your portal...</div>}
    >
      <PortalShell routeRole={role} slug={slug} />
    </Suspense>
  );
}
