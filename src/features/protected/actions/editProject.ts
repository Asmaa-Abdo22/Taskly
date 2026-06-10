"use server";

import { getAuthTokens } from "../../auth/utils/sessionCookies";
import { addNewProjectData } from "../types/protected.types";
const parseResponse = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};
export const fetchEditProject = async (
  projectId: string,
  data: addNewProjectData,
) => {
  const { accessToken } = await getAuthTokens();

  if (!accessToken) {
    return {
      response: { ok: false, status: 401 },
      result: { message: "You must be logged in to edit a project." },
    };
  }

  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/projects?id=eq.${projectId}`,
    {
      method: "PATCH",
      headers: {
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  const result = await parseResponse(response);
  return {
    response: { ok: response.ok, status: response.status },
    result,
  };
};
