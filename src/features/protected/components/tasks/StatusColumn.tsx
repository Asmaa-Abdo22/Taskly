"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Link from "next/link";
import { useEffect } from "react";
import { useGetTasksView } from "../../hooks/useGetTasksView";
import type { RegisteredTaskBoardColumn } from "../../hooks/useTaskBoardDragAndDrop";
import type { Task } from "../../types/protected.types";
import TodoCardSkeleton from "./statusColSkeleton";
import { useAppDispatch } from "@/src/store/hooks";
import { openTaskDetails } from "../../slices/taskDetailsSlice";
import DraggableTaskCard from "./DraggableTaskCard";

type Props = {
  projectId: string;
  status: string;
  title: string;
  circleColor: string;
  countBg: string;
  registerColumn: (
    status: string,
    column: RegisteredTaskBoardColumn,
  ) => () => void;
};

export default function StatusColumn({
  projectId,
  status,
  title,
  circleColor,
  countBg,
  registerColumn,
}: Props) {
  const {
    getTasksView,
    allTasksView,
    setAllTasksView,
    tasksViewLoading,
    tasksViewError,
    tasksViewInfiniteScrollLoading,
    tasksViewObserverRef,
    tasksViewTotalCount,
    setTasksViewTotalCount,
    tasksViewHasNextPage,
    getNextTasksViewPage,
  } = useGetTasksView();
  const { setNodeRef } = useDroppable({
    id: status,
    data: {
      type: "column",
      status,
    },
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTasksView(status);
  }, [getTasksView, status]);

  useEffect(() => {
    return registerColumn(status, {
      tasks: allTasksView,
      totalCount: tasksViewTotalCount,
      setTasks: setAllTasksView,
      setTotalCount: setTasksViewTotalCount,
    });
  }, [
    allTasksView,
    registerColumn,
    setAllTasksView,
    setTasksViewTotalCount,
    status,
    tasksViewTotalCount,
  ]);

  useEffect(() => {
    if (
      tasksViewLoading ||
      tasksViewInfiniteScrollLoading ||
      !tasksViewHasNextPage ||
      !tasksViewObserverRef.current
    ) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getNextTasksViewPage();
      }
    });

    observer.observe(tasksViewObserverRef.current);

    return () => observer.disconnect();
  }, [
    getNextTasksViewPage,
    tasksViewHasNextPage,
    tasksViewInfiniteScrollLoading,
    tasksViewLoading,
    tasksViewObserverRef,
  ]);

  if (tasksViewError) {
    throw tasksViewError;
  }

  const getCardStyles = () => {
    switch (status) {
      case "IN_PROGRESS":
        return {
          card: "bg-white border-l-4 border-blue-800",
          avatar: "bg-blue-700 text-white",
        };

      case "BLOCKED":
        return {
          card: "bg-red-50 border border-red-200",
          avatar: "bg-slate-200 text-slate-900",
        };

      case "DONE":
        return {
          card: "bg-green-50 border border-green-200",
          avatar: "bg-slate-200 text-slate-900",
        };

      default:
        return {
          card: "bg-white",
          avatar: "bg-slate-200 text-slate-900",
        };
    }
  };

  const styles = getCardStyles();
  const taskIds = allTasksView?.map((task) => task.id) || [];

  return (
    <div ref={setNodeRef} className="flex flex-col gap-3 min-w-70">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${circleColor}`} />

          <span className="uppercase text-[11px] font-bold text-slate-700">
            {title}
          </span>

          <div
            className={`${countBg} rounded-md px-2 py-1 text-[10px] font-bold`}
          >
            {tasksViewTotalCount || 0}
          </div>
        </div>

        <Link
          href={`/project/${projectId}/tasks/new?status=${status}`}
          className="text-xl text-slate-400"
        >
          +
        </Link>
      </div>

      {/* add task */}
      <Link
        href={`/project/${projectId}/tasks/new?status=${status}`}
        className="
          border
          border-dashed
          border-slate-300
          rounded-md
          py-3
          text-center
          text-[12px]
          font-bold
          uppercase
          tracking-wider
          text-slate-600
        "
      >
        + Add New Task
      </Link>

      {/* tasks */}
      {tasksViewLoading ? (
        <div className="text-center py-5">
          <TodoCardSkeleton />
        </div>
      ) : !allTasksView?.length ? (
        <div
          className="
      rounded-xl
      border
      border-dashed
      border-slate-300
      p-5
      text-center
      text-sm
      text-slate-500
    "
        >
          No tasks found
        </div>
      ) : (
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {allTasksView.map((task: Task) => (
            <DraggableTaskCard
              key={task.id}
              task={task}
              status={status}
              styles={styles}
              onOpen={() => dispatch(openTaskDetails(task.id))}
            />
          ))}
        </SortableContext>
      )}
      {tasksViewInfiniteScrollLoading && (
        <div className="text-center py-5">
          <TodoCardSkeleton />
        </div>
      )}
      <div ref={tasksViewObserverRef} />
    </div>
  );
}
