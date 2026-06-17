"use client";

import { useEffect, useState } from "react";
import { getEpicDetailsApi } from "../actions/getEpicDetails";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { ListProjectEpics } from "../types/protected.types";

export const useGetEpicDetails = (epicId: string) => {
  const [loading, setLoading] = useState(false);
  const [epic, setEpic] = useState<ListProjectEpics | null>(null);
  const params = useParams();
  const projectId = params.projectId as string;

  const getEpicDetails = async () => {
    try {
      setLoading(true);

      const { response, result } = await getEpicDetailsApi(
        projectId,
        epicId,
      );

      if (!response.ok) {
        toast.error(
          `Failed to get epic details: ${
            result?.message ||
            result?.hint ||
            "Something went wrong"
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

  return {
    loading,
    epic,
  };
};