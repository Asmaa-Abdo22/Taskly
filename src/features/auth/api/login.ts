"use server";

import type { LoginPayload } from "../types/auth.types";
import { setAuthCookies } from "../utils/sessionCookies";

const parseResponse = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

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

  const result = await parseResponse(response);

  if (response.ok && result?.access_token && result?.refresh_token) {
    await setAuthCookies({
      accessToken: result.access_token,
      refreshToken: result.refresh_token,
    });
  }

  return { response: { ok: response.ok }, result };
};
