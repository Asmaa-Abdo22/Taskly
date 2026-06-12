export default async function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  return (
    <>
      {children}
    </>
  );
}
