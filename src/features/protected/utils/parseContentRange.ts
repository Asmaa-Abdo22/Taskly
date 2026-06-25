import type { PaginationMeta } from "../types/protected.types";

export const emptyPagination: PaginationMeta = {
  totalCount: 0,
  startIndex: null,
  endIndex: null,
};

export const parseContentRange = (
  contentRange: string | null,
): PaginationMeta => {
  if (!contentRange) {
    return emptyPagination;
  }

  const emptyMatch = contentRange.match(/^\*\/(\d+)$/);

  if (emptyMatch) {
    return {
      startIndex: null,
      endIndex: null,
      totalCount: Number(emptyMatch[1]),
    };
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
