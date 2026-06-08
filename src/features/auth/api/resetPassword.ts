"use server";
import type { ResetPasswordPayload } from "../types/auth.types";

const parseResponse = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

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

  const result = await parseResponse(response);

  return { response: { ok: response.ok }, result };
};
