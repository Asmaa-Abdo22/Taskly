"use client";

import { useEffect, useState } from "react";
import { addNewTaskApi } from "../actions/addNewTask";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddNewTaskForm, addNewTaskSchema } from "../schemas/addNewTaskSchema";
import toast from "react-hot-toast";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useGetProjectEpics } from "./useGetAllEpics";
import { ListProjectEpics, Member } from "../types/protected.types";
import { useGetProjectMembers } from "./useGetProjectMembers";

export const useAddNewTask = () => {
  const [loading, setLoading] = useState(false);
  const [projectMembers, setProjectMembers] = useState<Member[]>([]);
  // get epic id from search params
  const epicIdParam = useSearchParams().get("epicId");
  const newTaskForm = useForm<AddNewTaskForm>({
    resolver: zodResolver(addNewTaskSchema),
    defaultValues: {
      status: "TO_DO",
      epic_id: epicIdParam || "",
    },
  });
  const { getValues, setValue } = newTaskForm;
  const params = useParams();
  const projectId = params.projectId as string;
  const router = useRouter();
  // get Epics
  const { allEpics } = useGetProjectEpics();
  // get project members
  const { getProjectMembers } = useGetProjectMembers();
  useEffect(() => {
    const loadMembers = async () => {
      const res = await getProjectMembers(projectId);
      const result = res?.result;
      setProjectMembers(result);
    };
    loadMembers();
  }, [projectId]);
  const addNewTask = async (data: AddNewTaskForm) => {
    try {
      setLoading(true);
      const payload = {
        ...data,
        project_id: projectId,
      };

      const { response, result } = await addNewTaskApi(payload);
      if (!response.ok) {
        toast.error(
          `Failed to Add Task: ${
            result?.message || result?.hint || "Something went wrong"
          }`,
        );
        return;
      }
      newTaskForm.reset();
      toast.success("Task Added Successfully");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const taskStatuses = [
    "TO_DO",
    "IN_PROGRESS",
    "BLOCKED",
    "IN_REVIEW",
    "READY_FOR_QA",
    "REOPENED",
    "READY_FOR_PRODUCTION",
    "DONE",
  ];
  useEffect(() => {
    if (!epicIdParam || !allEpics.length) return;

    const epic = allEpics.find((item) => item.epic_id === epicIdParam);

    if (epic) {
      setValue("epic_id", epic.id);
    }
  }, [epicIdParam, allEpics, setValue]);

  return {
    addNewTask,
    ...newTaskForm,
    loading,
    projectId,
    router,
    allEpics,
    projectMembers,
    epicIdParam,
    taskStatuses,
  };
};
