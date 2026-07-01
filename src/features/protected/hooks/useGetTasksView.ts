"use client";

import { useTasksBoardColumn } from "./useTasksBoardColumn";
import { useTasksList } from "./useTasksList";

export type TasksLoadingType = "initial" | "pagination" | "infinite";

export const TASKS_PAGE_LIMIT = 4;

type UseGetTasksViewOptions = {
  enableTasksList?: boolean;
  enableTasksViewSearch?: boolean;
};

export const useGetTasksView = ({
  enableTasksList = true,
  enableTasksViewSearch = false,
}: UseGetTasksViewOptions = {}) => {
  const tasksList = useTasksList({
    enabled: enableTasksList,
    limit: TASKS_PAGE_LIMIT,
  });
  const tasksBoardColumn = useTasksBoardColumn({
    enableSearch: enableTasksViewSearch,
    limit: TASKS_PAGE_LIMIT,
  });

  return {
    ...tasksBoardColumn,
    ...tasksList,
    projectId: tasksList.projectId,
    searchTerm: tasksList.searchTerm,
    handleSearchChange: tasksList.handleSearchChange,
  };
};
