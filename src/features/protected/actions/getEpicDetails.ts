"use server";

import { getAuthTokens } from "../../auth/utils/sessionCookies";


export const getEpicDetailsApi= async (projectId: string ,epicId:string) => {
  const { accessToken } = await getAuthTokens();

  if (!accessToken) {
    return {
      response: { ok: false, status: 401 },
      result: { message: "Unauthorized" },
    };
  }

  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}&id=eq.${epicId}`,
    {
      method: "GET",
      headers: {
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const result = await response.json()

  return {
    response: { ok: response.ok, status: response.status },
    result: result?.[0] || null,
  };
};