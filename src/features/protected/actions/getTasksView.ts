"use server";

import { getTasksViewApi as getTasksView } from "./tasks/getTasksBoard";
import { getTasksListApi as getTasksList } from "./tasks/getTasksList";
import type { TasksPaginationParams } from "../types/protected.types";

export const getTasksViewApi = async (params: TasksPaginationParams) =>
  getTasksView(params);

export const getTasksListApi = async (params: TasksPaginationParams) =>
  getTasksList(params);
