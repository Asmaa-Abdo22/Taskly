"use client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProjectMembers } from "../actions/getProjectMembers";

export const useGetProjectMembers = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getProjectMembers = useCallback(async (projectId: string) => {
    try {
      setLoading(true);
      const { response, result } = await fetchProjectMembers(projectId);

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to load project members. Please try again.");
      }

      return { response, result };
    } finally {
      setLoading(false);
    }
  }, [router]);

  return {
    getProjectMembers,
    loading,
  };
};
