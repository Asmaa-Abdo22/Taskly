"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTasksViewApi } from "../actions/getTasksView";
import type { Task, TasksPaginationParams } from "../types/protected.types";
import { usePagination } from "./usePagination";
import { useTasksSearch } from "./useTasksSearch";
import type { TasksLoadingType } from "./useGetTasksView";

type UseTasksBoardColumnOptions = {
  enableSearch?: boolean;
  limit: number;
};

export const useTasksBoardColumn = ({
  enableSearch = false,
  limit,
}: UseTasksBoardColumnOptions) => {
  const [tasksViewLoading, setTasksViewLoading] = useState(true);
  const [allTasksView, setAllTasksView] = useState<Task[] | null>([]);
  const [tasksViewError, setTasksViewError] = useState<Error | string>("");
  const [tasksViewPaginationLoading, setTasksViewPaginationLoading] =
    useState(false);
  const [tasksViewInfiniteScrollLoading, setTasksViewInfiniteScrollLoading] =
    useState(false);
  const [tasksViewTotalCount, setTasksViewTotalCount] = useState(0);

  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  const tasksViewObserverRef = useRef<HTMLDivElement | null>(null);
  const tasksViewScrollRef = useRef<HTMLDivElement | null>(null);
  const latestTasksViewRequestRef = useRef(0);
  const isFetchingTasksViewRef = useRef(false);
  const currentTasksViewStatusRef = useRef("");
  const hasHandledDebouncedSearchRef = useRef(false);
  const { searchTerm, debouncedSearchTerm, handleSearchChange } =
    useTasksSearch();

  const {
    currentPage: tasksViewCurrentPage,
    setCurrentPage: setTasksViewCurrentPage,
    totalPages: tasksViewTotalPages,
    hasNextPage: tasksViewHasNextPage,
  } = usePagination({
    totalCount: tasksViewTotalCount,
    limit,
  });

  const getTasksView = useCallback(
    async (
      taskStatus: string,
      page = 1,
      loadingType: TasksLoadingType = "initial",
    ) => {
      if (isFetchingTasksViewRef.current && loadingType !== "initial") {
        return;
      }

      isFetchingTasksViewRef.current = true;

      const requestId = latestTasksViewRequestRef.current + 1;
      latestTasksViewRequestRef.current = requestId;
      currentTasksViewStatusRef.current = taskStatus;

      const offset = (page - 1) * limit;

      if (loadingType === "initial") {
        setTasksViewLoading(true);
      }

      if (loadingType === "pagination") {
        setTasksViewPaginationLoading(true);
      }

      if (loadingType === "infinite") {
        setTasksViewInfiniteScrollLoading(true);
      }

      try {
        setTasksViewError("");

        const paginationParams: TasksPaginationParams = {
          projectId,
          status: taskStatus,
          limit,
          offset,
          searchTerm: debouncedSearchTerm,
        };

        const { response, result, pagination } =
          await getTasksViewApi(paginationParams);

        if (response.status === 401) {
          router.push("/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to search tasks");
        }

        if (
          latestTasksViewRequestRef.current !== requestId ||
          currentTasksViewStatusRef.current !== taskStatus
        ) {
          return;
        }

        const tasksResult = result || [];

        setTasksViewTotalCount(
          pagination.totalCount ||
            (tasksResult.length < limit
              ? offset + tasksResult.length
              : offset + limit + 1),
        );
        setTasksViewCurrentPage(page);
        setAllTasksView((prevTasks) =>
          loadingType === "infinite"
            ? [...(prevTasks || []), ...tasksResult]
            : tasksResult,
        );
      } catch (err) {
        if (err instanceof Error) {
          setTasksViewError(err);
        }
      } finally {
        if (latestTasksViewRequestRef.current !== requestId) {
          return;
        }

        isFetchingTasksViewRef.current = false;

        if (loadingType === "initial") {
          setTasksViewLoading(false);
        }

        if (loadingType === "pagination") {
          setTasksViewPaginationLoading(false);
        }

        if (loadingType === "infinite") {
          setTasksViewInfiniteScrollLoading(false);
        }
      }
    },
    [limit, projectId, router, setTasksViewCurrentPage, debouncedSearchTerm],
  );

  useEffect(() => {
    if (!enableSearch) {
      return;
    }

    if (!hasHandledDebouncedSearchRef.current) {
      hasHandledDebouncedSearchRef.current = true;
      return;
    }

    if (!currentTasksViewStatusRef.current) {
      return;
    }

    setTasksViewCurrentPage(1);
    setAllTasksView([]);
    getTasksView(currentTasksViewStatusRef.current, 1, "initial");
  }, [debouncedSearchTerm, enableSearch, getTasksView, setTasksViewCurrentPage]);

  const getNextTasksViewPage = useCallback(() => {
    if (
      tasksViewLoading ||
      tasksViewInfiniteScrollLoading ||
      !tasksViewHasNextPage ||
      !currentTasksViewStatusRef.current
    ) {
      return;
    }

    getTasksView(
      currentTasksViewStatusRef.current,
      tasksViewCurrentPage + 1,
      "infinite",
    );
  }, [
    getTasksView,
    tasksViewCurrentPage,
    tasksViewHasNextPage,
    tasksViewInfiniteScrollLoading,
    tasksViewLoading,
  ]);

  return {
    tasksViewLoading,
    getTasksView,
    allTasksView,
    tasksViewError,
    tasksViewPaginationLoading,
    tasksViewInfiniteScrollLoading,
    tasksViewObserverRef,
    tasksViewScrollRef,
    tasksViewCurrentPage,
    tasksViewTotalPages,
    tasksViewTotalCount,
    tasksViewHasNextPage,
    getNextTasksViewPage,
    projectId,
    searchTerm,
    debouncedSearchTerm,
    handleSearchChange,
    setAllTasksView,
    setTasksViewTotalCount,
  };
};
