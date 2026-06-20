"use server";

import { getAuthTokens } from "../../auth/utils/sessionCookies";
import { AddNewTaskForm } from "../schemas/addNewTaskSchema";

export const addNewTaskApi = async (data: AddNewTaskForm) => {
  const { accessToken } = await getAuthTokens();
  if (!accessToken) {
    return {
      response: { ok: false, status: 401 },
      result: { message: "You must be logged in to create a Task." },
    };
  }
  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/tasks`, {
    method: "POST",
    headers: {
      apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return {
    response: { ok: response.ok, status: response.status },
    result,
  };
};
