"use server";

export const logoutUser = async (accessToken: string) => {
  const response = await fetch(`${process.env.SUPABASE_URL}/auth/v1/logout`, {
    method: "POST",
    headers: {
      apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return { response: { ok: response.ok } };
};
