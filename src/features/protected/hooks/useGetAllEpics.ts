"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import { getEpicsApi } from "../actions/getProjectEpics";
import type {
  ListProjectEpics,
  ProjectsPaginationParams,
} from "../types/protected.types";

import { ProjectsLoadingType, PROJECTS_PAGE_LIMIT } from "./useGetAllProjects";
import { useParams, useRouter } from "next/navigation";
import { usePagination } from "./usePagination";

export const useGetProjectEpics = () => {
  const params = useParams();
  const projectId = params.projectId as string;
  const [allEpics, setAllEpics] = useState<ListProjectEpics[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<Error | string>("");
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [infiniteScrollLoading, setInfiniteScrollLoading] = useState(false);

  const router = useRouter();

  const observerRef = useRef<HTMLDivElement | null>(null);
  const latestRequestRef = useRef(0);
  const isFetchingRef = useRef(false);

  const limit = PROJECTS_PAGE_LIMIT;
  const { currentPage, setCurrentPage, totalPages, pageNumbers, hasNextPage } =
    usePagination({
      totalCount,
      limit,
    });
  const [selectedEpicId, setSelectedEpicId] = useState< null | string>(null);

  const getProjectEpics = useCallback(
    async (page: number, loadingType: ProjectsLoadingType = "initial") => {
      if (isFetchingRef.current) {
        return;
      }

      isFetchingRef.current = true;

      const requestId = latestRequestRef.current + 1;
      latestRequestRef.current = requestId;

      const offset = (page - 1) * limit;

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
        setError("");

        const params: ProjectsPaginationParams = {
          limit,
          offset,
          projectId,
        };

        const { response, result, pagination } = await getEpicsApi(params);

        if (response.status === 401) {
          router.push("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(
            "We're having trouble retrieving your project epics right now. Please try again in a moment.",
          );
        }

        if (latestRequestRef.current !== requestId) {
          return;
        }

        const projectsResult = result || [];

        setTotalCount(pagination?.totalCount ?? 0);

        setCurrentPage(page);

        setAllEpics((prevProjects) =>
          loadingType === "infinite"
            ? [...prevProjects, ...projectsResult]
            : projectsResult,
        );
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        isFetchingRef.current = false;

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
    [limit, router, setCurrentPage],
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (isMobile === null) {
      return;
    }

    setAllEpics([]);
    setCurrentPage(1);

    getProjectEpics(1, "initial");
  }, [getProjectEpics, isMobile, setCurrentPage]);

  useEffect(() => {
    if (
      !isMobile ||
      loading ||
      infiniteScrollLoading ||
      !hasNextPage ||
      !observerRef.current
    ) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getProjectEpics(currentPage + 1, "infinite");
      }
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [
    currentPage,
    getProjectEpics,
    hasNextPage,
    infiniteScrollLoading,
    isMobile,
    loading,
  ]);

  const handlePageChange = (page: number) => {
    if (page === currentPage || paginationLoading) {
      return;
    }

    getProjectEpics(page, "pagination");
  };

  return {
    loading,
    getProjectEpics,
    allEpics,
    error,

    paginationLoading,
    infiniteScrollLoading,

    isMobile,
    observerRef,

    currentPage,
    totalPages,
    pageNumbers,
    totalCount,
    hasNextPage,
    projectId,
    handlePageChange,
    selectedEpicId,
    setSelectedEpicId
  };
};
