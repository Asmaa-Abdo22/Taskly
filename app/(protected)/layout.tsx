import ProtectedLayoutShell from "@/src/features/protected/components/ProtectedLayoutShell";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedLayoutShell>{children}</ProtectedLayoutShell>;
}
