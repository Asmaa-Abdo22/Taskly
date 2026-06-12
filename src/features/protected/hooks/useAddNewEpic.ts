"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { addNewEpicApi } from "../actions/addNewEpic";
import { addNewEpicSchema } from "../schemas/addNewEpicSchema";
import { addNewEpicData, addNewEpicForm } from "../types/protected.types";
import { useRouter } from "next/navigation";

export const useAddNewEpic = (projectId: string) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const newEpicForm = useForm<addNewEpicForm>({
    resolver: zodResolver(addNewEpicSchema),
  });

  const addAddNewEpic = async (data: addNewEpicForm) => {
    try {
      setLoading(true);
      const payload: addNewEpicData = {
        title: data.title.trim(),
        description: data.description?.trim() || undefined,
        assignee_id: data.assignee_id || undefined,
        deadline: data.deadline || undefined,
        project_id: projectId,
      };
      const { response, result } = await addNewEpicApi(payload);
      console.log("epicc",result)
      if (!response.ok) {
        toast.error(
          `Failed to create epic: ${
            result?.message || result?.hint || "Something went wrong"
          }`,
        );
        return;
      }

      newEpicForm.reset();
      toast.success("Epic created successfully");
      router.push(`/project/${projectId}/epics`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };
  return {
    ...newEpicForm,
    loading,
    addAddNewEpic,
    router,
  };
};
