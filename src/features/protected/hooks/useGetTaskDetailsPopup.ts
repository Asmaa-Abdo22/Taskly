"use client"
import { useParams } from "next/navigation";
import { STATUSES } from "../components/tasks/ListViewDesktop";
import { closeTaskDetails, getTaskDetailsPopup } from "../slices/taskDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { useEffect } from "react";


export const useTaskDetailsPopup = () => {
  const params = useParams();
  const projectId = params.projectId as string;

  const dispatch = useAppDispatch();

  const state = useAppSelector(
    (state) => state.taskDetails
  );

  useEffect(() => {
    if (!state.selectedTaskId) return;

    dispatch(
      getTaskDetailsPopup({
        projectId,
        taskId: state.selectedTaskId,
      })
    );
  }, [dispatch, projectId, state.selectedTaskId]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch(closeTaskDetails());
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [dispatch]);

  const currentStatus = state.task
    ? STATUSES.find(
        (status) => status.status === state?.task?.status
      )
    : null;

  return {
    projectId,
    ...state,
    currentStatus,
    closePopup: () => dispatch(closeTaskDetails()),
  };
};