import PublicNavbar from "@/src/components/PublicNavbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNavbar />
      <main className="mb-10">{children}</main>
    </>
  );
}