"use client";
import { useState } from "react";
import { getEpicsApi } from "../actions/getProjectEpics";
import type { ListProjectEpics, Task } from "../types/protected.types";

import { getAllTasksApi } from "../actions/getAllTasks";
export const useGetAllTasks = (epicId: string) => {
  const [tasksLoading, setTasksLoading] = useState(true);
  const [allTasks, setAllTasks] = useState<Task[] | null>(null);
  const [tasksError, settasksError] = useState<Error | string>("");
  const getAllTasks = async () => {
    console.log("epicId =", epicId);
    try {
      setTasksLoading(true);
      settasksError("");
      const { response, result } = await getAllTasksApi(epicId);
      if (!response.ok) {
        throw new Error("Failed to load tasks");
      }
      setAllTasks(result);
      console.log("all tasks", result);
    } catch (err) {
      if (err instanceof Error) {
        settasksError(err);
      }
    } finally {
      setTasksLoading(false);
    }
  };

  return {
    tasksLoading,
    getAllTasks,
    allTasks,
    tasksError,
  };
};
