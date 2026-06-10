"use server";

import { clearAuthCookies, getAuthTokens, setAuthCookies } from "../utils/sessionCookies";

const parseResponse = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const refreshSession = async () => {
  const { refreshToken, rememberSession } = await getAuthTokens();

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

  const data = await parseResponse(response);

  if (response.ok && data?.access_token && data?.refresh_token) {
    await setAuthCookies(
      {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      },
      rememberSession,
    );
  } else {
    await clearAuthCookies();
  }

  return { response: { ok: response.ok }, data };
};
