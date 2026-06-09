"use client";

import { useState } from "react";
import { getAllProjects } from "../actions/getAllProjects";
import { useRouter } from "next/navigation";

export const useGetAllProjects = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchAllProjects = async () => {
    const { response, result } = await getAllProjects();
    try {
      if (response.status === 401) {
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to load projects");
      }

      return { response, result };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getAllProjects: fetchAllProjects,
  };
};
