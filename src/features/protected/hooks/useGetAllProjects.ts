"use client";

import { useCallback, useState } from "react";
import { getAllProjects } from "../actions/getAllProjects";
import { useRouter } from "next/navigation";
import type { ProjectsPaginationParams } from "../types/protected.types";

type ProjectsLoadingType = "initial" | "pagination" | "infinite";

export const useGetAllProjects = () => {
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [infiniteScrollLoading, setInfiniteScrollLoading] = useState(false);
  const router = useRouter();

  const fetchAllProjects = useCallback(
    async (
      params: ProjectsPaginationParams,
      loadingType: ProjectsLoadingType = "initial",
    ) => {
      if (loadingType === "initial") {
        setLoading(true);
      }

      if (loadingType === "pagination") {
        setPaginationLoading(true);
      }

      if (loadingType === "infinite") {
        setInfiniteScrollLoading(true);
      }

      try {
        const { response, result, pagination } = await getAllProjects(params);

        if (response.status === 401) {
          router.push("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(
            "  We're having trouble retrieving your projects right now. Please try again in a moment",
          );
        }

        return { response, result, pagination };
      } finally {
        if (loadingType === "initial") {
          setLoading(false);
        }

        if (loadingType === "pagination") {
          setPaginationLoading(false);
        }

        if (loadingType === "infinite") {
          setInfiniteScrollLoading(false);
        }
      }
    },
    [router],
  );

  return {
    loading,
    paginationLoading,
    infiniteScrollLoading,
    getAllProjects: fetchAllProjects,
  };
};
