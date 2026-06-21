"use client";
import { useState } from "react";
import type {  Task } from "../types/protected.types";

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
    } catch (err) {
      if (err instanceof Error) {
        settasksError(new Error("Failed to load tasks"));
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
