"use client";
import { useState } from "react";
import type { Task } from "../types/protected.types";
import { useParams } from "next/navigation";
import { getTasksViewApi } from "../actions/getTasksView";
export const useGeTasksView = () => {
  const [tasksViewLoading, setTasksViewLoading] = useState(true);
  const [allTasksView, setAllTasksView] = useState<Task[] | null>(null);
  const [tasksViewError, setTasksViewError] = useState<Error | string>("");
  const params = useParams();
  const projectId = params.projectId as string;
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
  return {
    tasksViewLoading,
    getTasksView,
    allTasksView,
    tasksViewError,
    projectId,
  };
};
