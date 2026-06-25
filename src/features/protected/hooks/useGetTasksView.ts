"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Task, TasksPaginationParams } from "../types/protected.types";
import { useParams, useRouter } from "next/navigation";
import { getTasksListApi, getTasksViewApi } from "../actions/getTasksView";
import { usePagination } from "./usePagination";

export type TasksLoadingType = "initial" | "pagination" | "infinite";

export const TASKS_PAGE_LIMIT = 4;

export const useGetTasksView = () => {
  const [tasksViewLoading, setTasksViewLoading] = useState(true);
  const [allTasksView, setAllTasksView] = useState<Task[] | null>([]);
  const [tasksViewError, setTasksViewError] = useState<Error | string>("");
  const [tasksViewPaginationLoading, setTasksViewPaginationLoading] =
    useState(false);
  const [tasksViewInfiniteScrollLoading, setTasksViewInfiniteScrollLoading] =
    useState(false);
  const [tasksViewTotalCount, setTasksViewTotalCount] = useState(0);

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
  const limit = TASKS_PAGE_LIMIT;

  const tasksListObserverRef = useRef<HTMLDivElement | null>(null);
  const tasksViewObserverRef = useRef<HTMLDivElement | null>(null);
  const latestTasksListRequestRef = useRef(0);
  const latestTasksViewRequestRef = useRef(0);
  const isFetchingTasksListRef = useRef(false);
  const isFetchingTasksViewRef = useRef(false);
  const currentTasksViewStatusRef = useRef("");

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
      if (isFetchingTasksViewRef.current) {
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
        };

        const { response, result, pagination } =
          await getTasksViewApi(paginationParams);

        if (response.status === 401) {
          router.push("/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to load tasks view");
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
          setTasksViewError(new Error("Failed to load tasks"));
        }
      } finally {
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
    [limit, projectId, router, setTasksViewCurrentPage],
  );

  const getTasksList = useCallback(
    async (page = 1, loadingType: TasksLoadingType = "initial") => {
      if (isFetchingTasksListRef.current) {
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
        };

        const { response, result, pagination } =
          await getTasksListApi(paginationParams);

        if (response.status === 401) {
          router.push("/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to load tasks list");
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
          setTasksListError(new Error("Failed to load task lists"));
        }
      } finally {
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
    [limit, projectId, router, setTasksListCurrentPage],
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

    let isActive = true;

    queueMicrotask(() => {
      if (isActive) {
        getTasksList(1, "initial");
      }
    });

    return () => {
      isActive = false;
    };
  }, [getTasksList, isMobile]);

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
    tasksViewCurrentPage,
    tasksViewTotalPages,
    tasksViewTotalCount,
    tasksViewHasNextPage,
    getNextTasksViewPage,
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
  };
};
