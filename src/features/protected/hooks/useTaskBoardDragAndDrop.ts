"use client";

import {
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  type DragEndEvent,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useCallback, useRef, type Dispatch, type SetStateAction } from "react";
import toast from "react-hot-toast";
import { updateTaskBoardApi } from "../actions/UpdateTaskBoard";
import type { Task } from "../types/protected.types";

export type RegisteredTaskBoardColumn = {
  tasks: Task[] | null;
  totalCount: number;
  setTasks: Dispatch<SetStateAction<Task[] | null>>;
  setTotalCount: Dispatch<SetStateAction<number>>;
};

const getOverStatus = (overId: UniqueIdentifier, overData: unknown) => {
  if (
    overData &&
    typeof overData === "object" &&
    "status" in overData &&
    typeof overData.status === "string"
  ) {
    return overData.status;
  }

  return String(overId);
};

const getTaskIndex = (tasks: Task[], taskId: UniqueIdentifier) =>
  tasks.findIndex((currentTask) => currentTask.id === String(taskId));


export const useTaskBoardDragAndDrop = () => {
  const columnsRef = useRef(new Map<string, RegisteredTaskBoardColumn>());

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const registerColumn = useCallback(
    (status: string, column: RegisteredTaskBoardColumn) => {
      columnsRef.current.set(status, column);

      return () => {
        columnsRef.current.delete(status);
      };
    },
    [],
  );

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over) {
      return;
    }

    const activeData = active.data.current;
    const overData = over.data.current;
    const task = activeData?.task as Task | undefined;
    const sourceStatus = activeData?.status as string | undefined;
    const targetStatus = getOverStatus(over.id, overData);

    if (!task || !sourceStatus) {
      return;
    }

    const sourceColumn = columnsRef.current.get(sourceStatus);
    const targetColumn = columnsRef.current.get(targetStatus);

    if (!sourceColumn || !targetColumn) {
      return;
    }

    const previousSourceTasks = sourceColumn.tasks || [];
    const previousTargetTasks = targetColumn.tasks || [];
    const activeIndex = getTaskIndex(previousSourceTasks, active.id);
    const overIndex = getTaskIndex(previousTargetTasks, over.id);

    if (sourceStatus === targetStatus) {
      if (active.id === over.id || activeIndex === -1 || overIndex === -1) {
        return;
      }

      sourceColumn.setTasks((currentTasks) =>
        arrayMove(currentTasks || [], activeIndex, overIndex),
      );
      return;
    }

    const previousSourceTotalCount = sourceColumn.totalCount;
    const previousTargetTotalCount = targetColumn.totalCount;
    const updatedTask = { ...task, status: targetStatus };
    const targetInsertIndex =
      overIndex === -1 ? previousTargetTasks.length : overIndex;

    sourceColumn.setTasks((currentTasks) =>
      (currentTasks || []).filter((currentTask) => currentTask.id !== task.id),
    );
    targetColumn.setTasks((currentTasks) => {
      const nextTasks = (currentTasks || []).filter(
        (currentTask) => currentTask.id !== task.id,
      );
      nextTasks.splice(targetInsertIndex, 0, updatedTask);

      return nextTasks;
    });
    sourceColumn.setTotalCount((currentTotal) => Math.max(currentTotal - 1, 0));
    targetColumn.setTotalCount((currentTotal) => currentTotal + 1);

    try {
      const { response } = await updateTaskBoardApi({
        taskId: task.id,
        taskStatus: targetStatus,
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }
    } catch {
      sourceColumn.setTasks(previousSourceTasks);
      targetColumn.setTasks(previousTargetTasks);
      sourceColumn.setTotalCount(previousSourceTotalCount);
      targetColumn.setTotalCount(previousTargetTotalCount);
      toast.error("Failed to move task. Please try again.");
    }
  };

  return {
    sensors,
    collisionDetection: closestCorners,
    handleDragEnd,
    registerColumn,
  };
};
