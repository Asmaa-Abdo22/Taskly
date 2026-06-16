"use server";

import { getAuthTokens } from "../../auth/utils/sessionCookies";
import type {
  ProjectsPaginationMeta,
  ProjectsPaginationParams,
} from "../types/protected.types";
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

export const getEpicsApi = async ({
  projectId,
  limit,
  offset,
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
  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}&limit=${limit}&offset=${offset}`,
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
