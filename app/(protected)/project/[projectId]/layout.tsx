
import { DesktopSidebar } from "@/src/features/protected/components/layout/DesktopSidebar";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <>
      {children}
    </>
  );
}