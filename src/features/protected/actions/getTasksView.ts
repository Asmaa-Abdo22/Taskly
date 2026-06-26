"use server";

import { getAuthTokens } from "../../auth/utils/sessionCookies";
import type { TasksPaginationParams } from "../types/protected.types";
import {
  emptyPagination,
  parseContentRange,
} from "../utils/parseContentRange";

const parseResponse = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

//& Get Tasks Board View
export const getTasksViewApi = async ({
  projectId,
  status,
  limit,
  offset,
  searchTerm,
}: TasksPaginationParams) => {
  const { accessToken } = await getAuthTokens();

  if (!accessToken) {
    return {
      response: { ok: false, status: 401 },
      result: null,
      pagination: emptyPagination,
    };
  }

  const queryParams = new URLSearchParams({
    project_id: `eq.${projectId}`,
    status: `eq.${status}`,
    limit: String(limit),
    offset: String(offset),
  });

  const trimmedSearchTerm = searchTerm?.trim();

  if (trimmedSearchTerm) {
    queryParams.set("title", `ilike.%${trimmedSearchTerm}%`);
  }

  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/project_tasks?${queryParams.toString()}`,
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

  const result = await parseResponse(response);
  const pagination = parseContentRange(
    response.headers.get("Content-Range"),
  );

  return {
    response: { ok: response.ok, status: response.status },
    result,
    pagination,
  };
};

//* Get Tasks List View

export const getTasksListApi = async ({
  projectId,
  limit,
  offset,
  searchTerm,
}: TasksPaginationParams) => {
  const { accessToken } = await getAuthTokens();

  if (!accessToken) {
    return {
      response: { ok: false, status: 401 },
      result: null,
      pagination: emptyPagination,
    };
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
    `${process.env.SUPABASE_URL}/rest/v1/project_tasks?${queryParams.toString()}`,
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

  const result = await parseResponse(response);
  const pagination = parseContentRange(
    response.headers.get("Content-Range"),
  );

  return {
    response: { ok: response.ok, status: response.status },
    result,
    pagination,
  };
};