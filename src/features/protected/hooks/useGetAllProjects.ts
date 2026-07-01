"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { getAllProjects } from "../actions/getAllProjects";
import { usePagination } from "./usePagination";

import type {
  ProjectsPaginationParams,
  getAllProjects as ProjectType,
} from "../types/protected.types";

export type ProjectsLoadingType = "initial" | "pagination" | "infinite";

export const PROJECTS_PAGE_LIMIT = 5;

export const useGetAllProjects = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
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

  const fetchProjects = useCallback(
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
        };

        const { response, result, pagination } = await getAllProjects(params);

        if (response.status === 401) {
          router.push("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(
            "We're having trouble retrieving your projects right now. Please try again in a moment",
          );
        }

        if (latestRequestRef.current !== requestId) {
          return;
        }

        const projectsResult = result || [];

        setTotalCount(
          (prevTotalCount) =>
            pagination.totalCount ||
            (projectsResult.length < limit
              ? offset + projectsResult.length
              : offset + limit + 1) ||
            prevTotalCount,
        );

        setCurrentPage(page);

        setProjects((prevProjects) =>
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

    setProjects([]);
    setCurrentPage(1);
    fetchProjects(1, "initial");
  }, [fetchProjects, isMobile, setCurrentPage]);

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
        fetchProjects(currentPage + 1, "infinite");
      }
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [
    currentPage,
    fetchProjects,
    hasNextPage,
    infiniteScrollLoading,
    isMobile,
    loading,
  ]);

  const handlePageChange = (page: number) => {
    if (page === currentPage || paginationLoading) {
      return;
    }

    fetchProjects(page, "pagination");
  };

  return {
    projects,
    error,

    loading,
    paginationLoading,
    infiniteScrollLoading,

    isMobile,
    observerRef,

    currentPage,
    totalPages,
    pageNumbers,
    totalCount,
    hasNextPage,

    handlePageChange,
  };
};
