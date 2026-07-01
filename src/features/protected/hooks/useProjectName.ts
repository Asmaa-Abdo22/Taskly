"use client";

import { useCallback, useEffect, useState } from "react";
import { getProjectById } from "../actions/getProjectById";

const PROJECT_NAME_FALLBACK = "Project";

export const useProjectName = (projectId?: string) => {
  const [projectName, setProjectName] = useState(PROJECT_NAME_FALLBACK);

  const loadProjectName = useCallback(async () => {
    if (!projectId) {
      return;
    }

    const { response, result } = await getProjectById(projectId);

    if (response.ok && result?.name) {
      setProjectName(result.name);
    }
  }, [projectId]);

  useEffect(() => {
    loadProjectName();
  }, [loadProjectName]);

  return projectName;
};
