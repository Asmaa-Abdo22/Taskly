"use client";

import { useCallback, useEffect, useState } from "react";

let tasksSearchTermValue = "";
const tasksSearchTermListeners = new Set<(value: string) => void>();

const setSharedTasksSearchTerm = (value: string) => {
  tasksSearchTermValue = value;
  tasksSearchTermListeners.forEach((listener) => listener(value));
};

export const useTasksSearch = () => {
  const [searchTerm, setSearchTerm] = useState(tasksSearchTermValue);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(
    tasksSearchTermValue.trim(),
  );

  const handleSearchChange = useCallback((value: string) => {
    setSharedTasksSearchTerm(value);
  }, []);

  useEffect(() => {
    const listener = (value: string) => {
      setSearchTerm(value);
    };

    tasksSearchTermListeners.add(listener);

    return () => {
      tasksSearchTermListeners.delete(listener);
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, [searchTerm]);

  return {
    searchTerm,
    debouncedSearchTerm,
    handleSearchChange,
  };
};
