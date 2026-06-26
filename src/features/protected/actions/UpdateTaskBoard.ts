"use server";

import { getAuthTokens } from "../../auth/utils/sessionCookies";

export const updateTaskBoardApi = async ({
  taskId,
  taskStatus,
}: {
  taskId: string;
  taskStatus: string;
}) => {
  const { accessToken } = await getAuthTokens();

  if (!accessToken) {
    return {
      response: { ok: false, status: 401 },
      result: null,
    };
  }

  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/tasks?id=eq.${taskId}`,
    {
      method: "PATCH",
      headers: {
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        status: taskStatus,
      }),
    },
  );

  const result = await response.json();

  return {
    response: { ok: response.ok, status: response.status },
    result,
  };
};
