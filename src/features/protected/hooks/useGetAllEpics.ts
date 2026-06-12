import { useCallback, useState } from "react";
import { getEpicsApi } from "../actions/getProjectEpics";

export const useGetProjectEpics = () => {
  const [loading, setLoading] = useState(false);

  const getProjectEpics = useCallback(async (projectId: string) => {
    try {
      setLoading(true);

      const { response, result } = await getEpicsApi(projectId);

      if (!response.ok) {
        throw new Error(
          "We're having trouble retrieving your project epics right now. Please try again in a moment.",
        );
      }

      return { response, result };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    getProjectEpics,
  };
};
