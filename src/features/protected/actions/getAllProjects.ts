"use server";

import { getAuthTokens } from "../../auth/utils/sessionCookies";
import type {
  ProjectsPaginationMeta,
  ProjectsPaginationParams,
} from "../types/protected.types";

const parseResponse = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const emptyPagination: ProjectsPaginationMeta = {
  totalCount: 0,
  startIndex: null,
  endIndex: null,
};

const parseContentRange = (
  contentRange: string | null,
): ProjectsPaginationMeta => {
  if (!contentRange) {
    return emptyPagination;
  }

  const match = contentRange.match(/^(\d+)-(\d+)\/(\d+|\*)$/);

  if (!match) {
    return emptyPagination;
  }

  return {
    startIndex: Number(match[1]),
    endIndex: Number(match[2]),
    totalCount: match[3] === "*" ? 0 : Number(match[3]),
  };
};

export const getAllProjects = async ({
  limit,
  offset,
}: ProjectsPaginationParams) => {
  const { accessToken } = await getAuthTokens();

  if (!accessToken) {
    return {
      response: { ok: false, status: 401 },
      result: null,
      pagination: emptyPagination,
    };
  }

  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/rpc/get_projects?limit=${limit}&offset=${offset}`,
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
  const pagination = parseContentRange(response.headers.get("Content-Range"));

  return {
    response: { ok: response.ok, status: response.status },
    result,
    pagination,
  };
};
