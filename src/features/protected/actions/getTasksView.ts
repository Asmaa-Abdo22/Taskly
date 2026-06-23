"use server";

import { getAuthTokens } from "../../auth/utils/sessionCookies";

export const getTasksViewApi = async (projectId: string, taskStatus: string) => {
  const { accessToken } = await getAuthTokens();

  if (!accessToken) {
    return {
      response: { ok: false, status: 401 },
      result: { message: "Unauthorized" },
    };
  }

  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/project_tasks?project_id=eq.${projectId}&status=eq.${taskStatus}`,
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

  return {
    response: { ok: response.ok, status: response.status },
    result,
  };
};
