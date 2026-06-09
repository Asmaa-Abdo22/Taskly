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

export const addNewProjectApi = async (data: addNewProjectData) => {
  const { accessToken } = await getAuthTokens();

  if (!accessToken) {
    return {
      response: { ok: false, status: 401 },
      result: { message: "You must be logged in to create a project." },
    };
  }

  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/projects`, {
    method: "POST",
    headers: {
      apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(data),
  });
  const result = await parseResponse(response);

  return {
    response: { ok: response.ok, status: response.status },
    result,
  };
};
