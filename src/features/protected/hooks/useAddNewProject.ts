"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { addNewProjectSchema } from "../schemas/addNewProjectSchema";
import { addNewProjectData, addNewProjectForm } from "../types/protected.types";
import { addNewProjectApi } from "../actions/addNewProject";

export const useAddNewProject = () => {
  const [loading, setLoading] = useState(false);

  const newProjectForm = useForm<addNewProjectForm>({
    resolver: zodResolver(addNewProjectSchema),
  });

  const addNewProject = async (data: addNewProjectData) => {
    try {
      setLoading(true);

      const { response, result } = await addNewProjectApi(data);

      if (!response.ok) {
        toast.error(
          `Failed to create project: ${
            result?.message || result?.hint || "Something went wrong"
          }`,
        );
        return;
      }

      newProjectForm.reset();

      toast.success("Project created successfully");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    ...newProjectForm,
    loading,
    addNewProject,
  };
};
