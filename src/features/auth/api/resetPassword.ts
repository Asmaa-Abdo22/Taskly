"use server";
import type { ResetPasswordPayload } from "../types/auth.types";

export const updatePassword = async (
  payload: ResetPasswordPayload,
  accessToken: string,
) => {
  const response = await fetch(
    `${process.env.SUPABASE_URL}/auth/v1/user`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await response.json();

  return { response: { ok: response.ok }, result };
};
