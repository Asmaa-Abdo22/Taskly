"use server";

import { getAuthTokens } from "../../auth/utils/sessionCookies";
import { UpdateEpicData } from "../types/protected.types";

export const getTaskDetailsPopupApi = async (projectId: string, taskId: string) => {
  const { accessToken } = await getAuthTokens();

  if (!accessToken) {
    return {
      response: { ok: false, status: 401 },
      result: { message: "Unauthorized" },
    };
  }

  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/project_tasks?project_id=eq.${projectId}&id=eq.${taskId}`,
    {
      method: "GET",
      headers: {
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const result = await response.json();

  return {
    response: { ok: response.ok, status: response.status },
    result: result?.[0] || null,
  };
};

// *Update Epic
export const UpdateEpicApi = async (
  epicId: string,
  epicBody: UpdateEpicData,
) => {
  const { accessToken } = await getAuthTokens();

  if (!accessToken) {
    return {
      response: { ok: false, status: 401 },
      result: { message: "Unauthorized" },
    };
  }

  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/epics?id=eq.${epicId}`,
    {
      method: "PATCH",
      headers: {
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify(epicBody),
    },
  );

  const result = await response.json();

  return {
    response: { ok: response.ok, status: response.status },
    result,
  };
};
