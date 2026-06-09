"use server";

import { getAuthTokens } from "../../auth/utils/sessionCookies";

const parseResponse = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const getCurrentUser = async () => {
  const { accessToken } = await getAuthTokens();

  if (!accessToken) {
    return { response: { ok: false }, result: null };
  }

  const response = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
    method: "GET",
    headers: {
      apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const result = await parseResponse(response);

  return { response: { ok: response.ok }, result };
};
