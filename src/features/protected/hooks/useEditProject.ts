import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { addNewProjectSchema } from "../schemas/addNewProjectSchema";
import { addNewProjectData } from "../types/protected.types";
import { fetchEditProject } from "../actions/editProject";
import { getProjectById } from "../actions/getProjectById";

export const useEditProject = (projectId: string) => {
  const [loading, setLoading] = useState(false);

  const EditProjectForm = useForm<addNewProjectData>({
    resolver: zodResolver(addNewProjectSchema),
  });

  const { setValue } = EditProjectForm;
  useEffect(() => {
    const loadProject = async () => {
      const { response, result } = await getProjectById(projectId);

      if (!response.ok || !result) {
        toast.error("Failed to load project data");
        return;
      }

      setValue("name", result.name);
      setValue("description", result.description);
    };

    if (projectId) {
      loadProject();
    }
  }, [projectId, setValue]);

  // EDIT
  const EditProject = async (projectId: string, data: addNewProjectData) => {
    try {
      setLoading(true);

      const { response, result } = await fetchEditProject(projectId, data);

      if (!response.ok) {
        toast.error(
          `Failed to Edit project: ${
            result?.message || result?.hint || "Something went wrong"
          }`,
        );
        return;
      }

      toast.success("Project Edited successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    ...EditProjectForm,
    EditProject,
    loading,
  };
};
