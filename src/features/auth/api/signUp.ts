"use server";
import type { SignUpPayload } from "../types/auth.types";

export const signUpWithEmail = async (payload: SignUpPayload) => {
  const response = await fetch(
    `${process.env.SUPABASE_URL}/auth/v1/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await response.json();

  return { response: { ok: response.ok }, result };
};
