"use server";

import { clearAuthCookies, getAuthTokens, setAuthCookies } from "../utils/sessionCookies";

export const refreshSession = async () => {
  const { refreshToken } = await getAuthTokens();

  if (!refreshToken) {
    await clearAuthCookies();
    return { response: { ok: false }, data: null };
  }

  const response = await fetch(
    `${process.env.SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    },
  );

  const data = await response.json();

  if (response.ok && data.access_token && data.refresh_token) {
    await setAuthCookies({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    });
  } else {
    await clearAuthCookies();
  }

  return { response: { ok: response.ok }, data };
};
