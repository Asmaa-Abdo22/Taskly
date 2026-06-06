"use server"
export const sendResetLink = async (email: string) => {
  const response = await fetch(
    `${process.env.SUPABASE_URL}/auth/v1/recover`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
      },
      body: JSON.stringify({ email }),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to send reset link");
  }

  return result;
};