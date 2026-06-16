import { useMemo, useState } from "react";

interface UsePaginationProps {
  totalCount: number;
  limit: number;
  initialPage?: number;
}

export const usePagination = ({
  totalCount,
  limit,
  initialPage = 1,
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = useMemo(
    () => Math.ceil(totalCount / limit),
    [totalCount, limit],
  );

  const hasNextPage = totalPages > 0 && currentPage < totalPages;

  const pageNumbers = useMemo(() => {
    if (totalPages <= 2) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage === 1) {
      return [1, 2];
    }

    if (currentPage === totalPages) {
      return [totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  }, [currentPage, totalPages]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    pageNumbers,
    hasNextPage,
  };
};