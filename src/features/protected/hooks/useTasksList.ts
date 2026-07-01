"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTasksListApi } from "../actions/getTasksView";
import type { Task, TasksPaginationParams } from "../types/protected.types";
import { usePagination } from "./usePagination";
import { useTasksSearch } from "./useTasksSearch";
import type { TasksLoadingType } from "./useGetTasksView";

type UseTasksListOptions = {
  enabled?: boolean;
  limit: number;
};

export const useTasksList = ({
  enabled = true,
  limit,
}: UseTasksListOptions) => {
  const [tasksListLoading, setTasksListLoading] = useState(true);
  const [allTasksList, setAllTasksList] = useState<Task[] | null>([]);
  const [tasksListError, setTasksListError] = useState<Error | string>("");
  const [tasksListPaginationLoading, setTasksListPaginationLoading] =
    useState(false);
  const [tasksListInfiniteScrollLoading, setTasksListInfiniteScrollLoading] =
    useState(false);
  const [tasksListTotalCount, setTasksListTotalCount] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  const tasksListObserverRef = useRef<HTMLDivElement | null>(null);
  const latestTasksListRequestRef = useRef(0);
  const isFetchingTasksListRef = useRef(false);
  const hasHandledDebouncedSearchRef = useRef(false);
  const hasLoadedInitialTasksListRef = useRef(false);
  const { searchTerm, debouncedSearchTerm, handleSearchChange } =
    useTasksSearch();

  const {
    currentPage: tasksListCurrentPage,
    setCurrentPage: setTasksListCurrentPage,
    totalPages: tasksListTotalPages,
    pageNumbers: tasksListPageNumbers,
    hasNextPage: tasksListHasNextPage,
  } = usePagination({
    totalCount: tasksListTotalCount,
    limit,
  });

  const getTasksList = useCallback(
    async (page = 1, loadingType: TasksLoadingType = "initial") => {
      if (isFetchingTasksListRef.current && loadingType !== "initial") {
        return;
      }

      isFetchingTasksListRef.current = true;

      const requestId = latestTasksListRequestRef.current + 1;
      latestTasksListRequestRef.current = requestId;

      const offset = (page - 1) * limit;

      if (loadingType === "initial") {
        setTasksListLoading(true);
      }

      if (loadingType === "pagination") {
        setTasksListPaginationLoading(true);
      }

      if (loadingType === "infinite") {
        setTasksListInfiniteScrollLoading(true);
      }

      try {
        setTasksListError("");

        const paginationParams: TasksPaginationParams = {
          projectId,
          limit,
          offset,
          searchTerm: debouncedSearchTerm,
        };

        const { response, result, pagination } =
          await getTasksListApi(paginationParams);

        if (response.status === 401) {
          router.push("/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to search tasks");
        }

        if (latestTasksListRequestRef.current !== requestId) {
          return;
        }

        const tasksResult = result || [];

        setTasksListTotalCount(
          pagination.totalCount ||
            (tasksResult.length < limit
              ? offset + tasksResult.length
              : offset + limit + 1),
        );
        setTasksListCurrentPage(page);
        setAllTasksList((prevTasks) =>
          loadingType === "infinite"
            ? [...(prevTasks || []), ...tasksResult]
            : tasksResult,
        );
      } catch (err) {
        if (err instanceof Error) {
          setTasksListError(err);
        }
      } finally {
        if (latestTasksListRequestRef.current !== requestId) {
          return;
        }

        isFetchingTasksListRef.current = false;

        if (loadingType === "initial") {
          setTasksListLoading(false);
        }

        if (loadingType === "pagination") {
          setTasksListPaginationLoading(false);
        }

        if (loadingType === "infinite") {
          setTasksListInfiniteScrollLoading(false);
        }
      }
    },
    [limit, projectId, router, setTasksListCurrentPage, debouncedSearchTerm],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

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

    if (!hasHandledDebouncedSearchRef.current) {
      hasHandledDebouncedSearchRef.current = true;
      return;
    }

    setTasksListCurrentPage(1);

    let cancelled = false;

    void Promise.resolve().then(() => {
      if (!cancelled && enabled) {
        setAllTasksList([]);
        getTasksList(1, "initial");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [
    debouncedSearchTerm,
    enabled,
    getTasksList,
    isMobile,
    setTasksListCurrentPage,
  ]);

  useEffect(() => {
    if (!enabled || isMobile === null || hasLoadedInitialTasksListRef.current) {
      return;
    }

    hasLoadedInitialTasksListRef.current = true;

    let isActive = true;

    queueMicrotask(() => {
      if (isActive) {
        getTasksList(1, "initial");
      }
    });

    return () => {
      isActive = false;
    };
  }, [enabled, getTasksList, isMobile]);

  useEffect(() => {
    if (
      !isMobile ||
      tasksListLoading ||
      tasksListInfiniteScrollLoading ||
      !tasksListHasNextPage ||
      !tasksListObserverRef.current
    ) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getTasksList(tasksListCurrentPage + 1, "infinite");
      }
    });

    observer.observe(tasksListObserverRef.current);

    return () => observer.disconnect();
  }, [
    getTasksList,
    isMobile,
    tasksListCurrentPage,
    tasksListHasNextPage,
    tasksListInfiniteScrollLoading,
    tasksListLoading,
  ]);

  const handleTasksListPageChange = useCallback(
    (page: number) => {
      if (page === tasksListCurrentPage || tasksListPaginationLoading) {
        return;
      }

      getTasksList(page, "pagination");
    },
    [getTasksList, tasksListCurrentPage, tasksListPaginationLoading],
  );

  return {
    projectId,
    getTasksList,
    allTasksList,
    tasksListError,
    tasksListLoading,
    tasksListPaginationLoading,
    tasksListInfiniteScrollLoading,
    tasksListObserverRef,
    tasksListCurrentPage,
    tasksListTotalPages,
    tasksListPageNumbers,
    tasksListTotalCount,
    tasksListHasNextPage,
    handleTasksListPageChange,
    searchTerm,
    debouncedSearchTerm,
    handleSearchChange,
  };
};
