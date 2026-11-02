import { PortalShell } from "@/components/layout/portal-shell";
export default async function PortalPage({
  params,
  searchParams,
}: {
  params: Promise<{ role: string; slug?: string[] }>;
  searchParams: Promise<{ lesson?: string; quiz?: string }>;
}) {
  const [{ role, slug }, query] = await Promise.all([params, searchParams]);
  return (
    <PortalShell
      routeRole={role}
      slug={slug}
      query={query.lesson ?? query.quiz}
    />
  );
}
