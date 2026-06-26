"use client";

import { updateTaskBoardApi } from "../actions/UpdateTaskBoard";

const useTaskBoardDragAndDrop = () => {
  const updateTaskBoard = async (taskId: string, taskStatus: string) => {
    try {
      const { response, result } = await updateTaskBoardApi({
        taskId,
        taskStatus,
      });
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
    } catch {
    } finally {
    }
  };
};
