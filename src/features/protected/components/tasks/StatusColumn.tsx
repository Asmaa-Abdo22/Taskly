"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useGetTasksView } from "../../hooks/useGetTasksView";
import type { Task } from "../../types/protected.types";
import { getAvatarInitials } from "../../utils/getAvatarInitials";
import TodoCardSkeleton from "./statusColSkeleton";
import { formatDate } from "../../utils/formatDate";
import { useAppDispatch } from "@/src/store/hooks";
import { openTaskDetails } from "../../slices/taskDetailsSlice";

type Props = {
  projectId: string;
  status: string;
  title: string;
  circleColor: string;
  countBg: string;
};

export default function StatusColumn({
  projectId,
  status,
  title,
  circleColor,
  countBg,
}: Props) {
  const { getTasksView, allTasksView, tasksViewLoading, tasksViewError } =
    useGetTasksView();

  useEffect(() => {
    getTasksView(status);
  }, [status]);
  if (tasksViewError) {
    throw tasksViewError;
  }
  const dispatch = useAppDispatch();
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

  return (
    <div className="flex flex-col gap-3 min-w-70">
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
            {allTasksView?.length || 0}
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
        allTasksView.map((task: Task) => (
          <div
            onClick={() => dispatch(openTaskDetails(task.id))}
            key={task.id}
            className={`
        rounded-xl
        p-5
        min-h-35
        flex
        flex-col
        justify-between
        ${styles.card}
        cursor-pointer
      `}
          >
            <h3 className="text-[14px] font-medium text-slate-900 leading-7">
              {task.title}
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-400">
                {formatDate(task.due_date)}
              </span>

              <div
                className={`
            w-8
            h-8
            rounded-full
            flex
            items-center
            justify-center
            text-[12px]
            font-bold
            ${styles.avatar}
          `}
              >
                {getAvatarInitials(task.assignee?.name ?? "")}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
