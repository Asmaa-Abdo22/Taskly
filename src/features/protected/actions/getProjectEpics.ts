"use server";

import { getAuthTokens } from "../../auth/utils/sessionCookies";
import type { ProjectsPaginationParams } from "../types/protected.types";
import { parseContentRange } from "../utils/parseContentRange";

export const getEpicsApi = async ({
  projectId,
  limit,
  offset,
  searchTerm,
}: ProjectsPaginationParams) => {
  const { accessToken } = await getAuthTokens();
  if (!accessToken) {
    if (!accessToken) {
      return {
        response: { ok: false, status: 401 },
        result: null,
      };
    }
  }
  const queryParams = new URLSearchParams({
    project_id: `eq.${projectId}`,
    limit: String(limit),
    offset: String(offset),
  });

  const trimmedSearchTerm = searchTerm?.trim();

  if (trimmedSearchTerm) {
    queryParams.set("title", `ilike.%${trimmedSearchTerm}%`);
  }

  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/project_epics?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Prefer: "count=exact",
      },
    },
  );
  const result = await response.json();
  const pagination = parseContentRange(response.headers.get("Content-Range"));
  return {
    result,
    response: { ok: response.ok, status: response.status },
    pagination,
  };
};
