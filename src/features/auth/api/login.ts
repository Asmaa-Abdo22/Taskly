"use server";

import type { LoginPayload } from "../types/auth.types";

export const loginWithPassword = async (payload: LoginPayload) => {
  const response = await fetch(
    `${process.env.SUPABASE_URL}/auth/v1/token?grant_type=password`,
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
