import ProtectedLayoutShell from "@/src/features/protected/components/ProtectedLayoutShell";
import { getCurrentUser } from "@/src/features/protected/actions/getCurrentUser";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { response, result } = await getCurrentUser();

  if (!response.ok || !result) {
    redirect("/login");
  }

  const user = {
    name: result.user_metadata?.name ?? "No Name",
    jobTitle: result.user_metadata?.job_title ?? "No Title",
  };

  return <ProtectedLayoutShell initialUser={user}>{children}</ProtectedLayoutShell>;
}
