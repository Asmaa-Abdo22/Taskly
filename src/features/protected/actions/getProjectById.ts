"use server";

import { getAuthTokens } from "../../auth/utils/sessionCookies";

const parseResponse = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const getProjectById = async (projectId: string) => {
  const { accessToken } = await getAuthTokens();

  if (!accessToken) {
    return {
      response: { ok: false, status: 401 },
      result: { message: "Unauthorized" },
    };
  }

  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/projects?id=eq.${projectId}&select=*`,
    {
      method: "GET",
      headers: {
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const result = await parseResponse(response);

  return {
    response: { ok: response.ok, status: response.status },
    result: result?.[0] || null,
  };
};