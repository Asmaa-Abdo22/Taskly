"use server";

import { clearAuthCookies, getAuthTokens } from "../utils/sessionCookies";
import { refreshSession } from "./refreshSession";

const callLogoutEndpoint = async (accessToken: string) =>
  fetch(`${process.env.SUPABASE_URL}/auth/v1/logout`, {
    method: "POST",
    headers: {
      apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const logoutUser = async () => {
  const { accessToken } = await getAuthTokens();

  if (!accessToken) {
    await clearAuthCookies();
    return { response: { ok: true } };
  }

  let response = await callLogoutEndpoint(accessToken);

  if (!response.ok) {
    const { response: refreshResponse } = await refreshSession();

    if (refreshResponse.ok) {
      const { accessToken: refreshedAccessToken } = await getAuthTokens();

      if (refreshedAccessToken) {
        response = await callLogoutEndpoint(refreshedAccessToken);
      }
    }
  }

  if (response.ok) {
    await clearAuthCookies();
  }

  return { response: { ok: response.ok } };
};
