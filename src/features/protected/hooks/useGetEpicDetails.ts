"use client";

import { useEffect, useState } from "react";
import { getEpicDetailsApi, UpdateEpicApi } from "../actions/getEpicDetails";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  ListProjectEpics,
  Member,
  UpdateEpicData,
} from "../types/protected.types";
import { useGetProjectMembers } from "./useGetProjectMembers";
import { useGetAllTasks } from "./useGetAllTasks";

type EpicField = "title" | "description" | "assignee_id" | "deadline";

export const useGetEpicDetails = (epicId: string) => {
  const [loading, setLoading] = useState(false);
  const [epic, setEpic] = useState<ListProjectEpics | null>(null);
  const params = useParams();
  const projectId = params.projectId as string;

  const getEpicDetails = async () => {
    try {
      setLoading(true);

      const { response, result } = await getEpicDetailsApi(projectId, epicId);

      if (!response.ok) {
        toast.error(
          `Failed to get epic details: ${
            result?.message || result?.hint || "Something went wrong"
          }`,
        );
        return;
      }

      setEpic(result);
    } catch {
      toast.error("Failed to get epic details");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getEpicDetails();
  }, [epicId]);
  const { getAllTasks,allTasks,tasksError,tasksLoading } = useGetAllTasks(epicId);
  useEffect(() => {
    getAllTasks();
  }, [epicId]);

  // *Update Epic
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId] = useState<string | null>(null);
  const [deadline, setDeadline] = useState("");
  const [projectMembers, setProjectMembers] = useState<Member[]>([]);
  const { getProjectMembers } = useGetProjectMembers();
  const [isEditingAssignee, setIsEditingAssignee] = useState(false);
  const [savingField, setSavingField] = useState<EpicField | null>(null);

  useEffect(() => {
    if (epic) {
      setTitle(epic.title);
      setDescription(epic.description || "");
      setAssigneeId(epic.assignee?.sub || null);
      setDeadline(epic.deadline || "");
    }
  }, [epic]);

  //? Get project members
  useEffect(() => {
    const getMembers = async () => {
      const res = await getProjectMembers(projectId);
      const result = res?.result;
      setProjectMembers(result);
    };
    getMembers();
  }, [projectId]);

  const updateEpic = async (
    field: EpicField,
    data: UpdateEpicData,
    getOldValues: () => void,
  ) => {
    if (!epic || savingField) return false;

    try {
      setSavingField(field);

      const { response } = await UpdateEpicApi(epicId, data);

      if (!response.ok) {
        getOldValues();
        toast.error("Failed to update epic. Please try again.");
        return false;
      }

      setEpic((currentEpic) => {
        if (!currentEpic) return currentEpic;

        if ("assignee_id" in data) {
          const selectedMember = projectMembers.find(
            (member) => member.user_id === data.assignee_id,
          );

          return {
            ...currentEpic,
            assignee: selectedMember
              ? {
                  sub: selectedMember.user_id,
                  name: selectedMember.metadata.name,
                  email: selectedMember.email,
                  department: selectedMember.metadata.job_title || "",
                }
              : null,
          };
        }

        return { ...currentEpic, ...data };
      });
      toast.success("Epic updated successfully");
      getAllTasks()
      return true;
    } catch {
      getOldValues();
      toast.error("Failed to update epic. Please try again.");
      return false;
    } finally {
      setSavingField(null);
    }
  };

  const saveTitle = async () => {
    if (!epic || savingField) return;

    const nextTitle = title.trim();
    const previousTitle = epic.title;

    if (!nextTitle) {
      setTitle(previousTitle);
      return;
    }

    if (nextTitle === previousTitle) {
      setTitle(previousTitle);
      return;
    }

    setTitle(nextTitle);
    await updateEpic("title", { title: nextTitle }, () => {
      setTitle(previousTitle);
    });
  };

  const saveDescription = async () => {
    if (!epic || savingField) return;

    const nextDescription = description.trim();
    const previousDescription = epic.description || "";

    if (nextDescription === previousDescription) return;

    setDescription(nextDescription);
    await updateEpic("description", { description: nextDescription }, () => {
      setDescription(previousDescription);
    });
  };

  const saveAssignee = async (nextAssigneeId: string | null) => {
    if (!epic || savingField) return;

    const previousAssigneeId = epic.assignee?.sub || null;

    if (nextAssigneeId === previousAssigneeId) {
      setAssigneeId(previousAssigneeId);
      setIsEditingAssignee(false);
      return;
    }

    setAssigneeId(nextAssigneeId);
    const updated = await updateEpic(
      "assignee_id",
      { assignee_id: nextAssigneeId },
      () => {
        setAssigneeId(previousAssigneeId);
      },
    );

    if (updated) setIsEditingAssignee(false);
  };

  const saveDeadline = async (nextDeadline: string) => {
    if (!epic || savingField) return;

    const previousDeadline = epic.deadline || "";
    const payloadDeadline = nextDeadline || null;

    if (nextDeadline === previousDeadline) return;

    setDeadline(nextDeadline);
    await updateEpic("deadline", { deadline: payloadDeadline }, () => {
      setDeadline(previousDeadline);
    });
  };

  return {
    loading,
    epic,
    title,
    description,
    assigneeId,
    deadline,
    setTitle,
    setDescription,
    setAssigneeId,
    setDeadline,
    projectMembers,
    isEditingAssignee,
    setIsEditingAssignee,
    savingField,
    saveTitle,
    saveDescription,
    saveAssignee,
    saveDeadline,
    projectId,
    allTasks,tasksError,tasksLoading
  };
};
