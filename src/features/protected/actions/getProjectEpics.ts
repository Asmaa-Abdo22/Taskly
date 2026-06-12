"use server";

import { getAuthTokens } from "../../auth/utils/sessionCookies";

export const getEpicsApi = async (projectId: string) => {
  const { accessToken } = await getAuthTokens();
  if (!accessToken) {
    if (!accessToken) {
      return {
        response: { ok: false, status: 401 },
        result: null,
      };
    }
  }
  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}`,
    {
      method: "GET",
      headers: {
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );
  const result = await response.json();
  return { result, response: { ok: response.ok, status: response.status } };
};
