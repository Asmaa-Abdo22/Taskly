"use server";

import { getAuthTokens } from "../../auth/utils/sessionCookies";
import { addNewEpicData } from "../types/protected.types";

const parseResponse = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const addNewEpicApi = async (data: addNewEpicData) => {
  const { accessToken } = await getAuthTokens();

  if (!accessToken) {
    return {
      response: { ok: false, status: 401 },
      result: { message: "You must be logged in to create an epic." },
    };
  }

  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/epics`, {
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
