"use client";
import { useEffect, useState } from "react";
import type { Task } from "../types/protected.types";
import { useParams } from "next/navigation";
import { getTasksListApi, getTasksViewApi } from "../actions/getTasksView";
export const useGetTasksView = () => {
  const [tasksViewLoading, setTasksViewLoading] = useState(true);
  const [allTasksView, setAllTasksView] = useState<Task[] | null>(null);
  const [tasksViewError, setTasksViewError] = useState<Error | string>("");
  const [tasksListLoading, setTasksListLoading] = useState(true);
  const [allTasksList, setAllTasksList] = useState<Task[] | null>([]);
  const [tasksListError, setTasksListError] = useState<Error | string>("");
  const params = useParams();
  const projectId = params.projectId as string;
  //& Get Tasks Board View
  const getTasksView = async (taskStatus: string) => {
    try {
      setTasksViewLoading(true);
      setTasksViewError("");
      const { response, result } = await getTasksViewApi(projectId, taskStatus);
      if (!response.ok) {
        throw new Error("Failed to load tasks view");
      }
      setAllTasksView(result);
    } catch (err) {
      if (err instanceof Error) {
        setTasksViewError(new Error("Failed to load tasks"));
      }
    } finally {
      setTasksViewLoading(false);
    }
  };
  //* Get Tasks List View
  const getTasksList = async () => {
    try {
      setTasksListLoading(true);
      setTasksListError("");
      const { response, result } = await getTasksListApi(projectId);
      if (!response.ok) {
        throw new Error("Failed to load tasks list");
      }
      setAllTasksList(result);
    } catch (err) {
      if (err instanceof Error) {
        setTasksListError(new Error("Failed to load task lists"));
      }
    } finally {
      setTasksListLoading(false);
    }
  };
  useEffect(() => {
    getTasksList();
  }, []);

  return {
    tasksViewLoading,
    getTasksView,
    allTasksView,
    tasksViewError,
    projectId,
    getTasksList,
    allTasksList,
    tasksListError,
    tasksListLoading,
  };
};
