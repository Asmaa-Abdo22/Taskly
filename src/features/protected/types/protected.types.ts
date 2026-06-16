import type { StaticImageData } from "next/image";
import { addNewProjectSchema } from "../schemas/addNewProjectSchema";
import type { z } from "zod";
import { addNewEpicSchema } from "../schemas/addNewEpicSchema";

export interface UserData {
  name: string;
  jobTitle: string;
}

export interface NavItem {
  name: string;
  icon: StaticImageData;
  path: string;
}
export type addNewProjectForm = z.infer<typeof addNewProjectSchema>;
export interface addNewProjectData {
  name: string;
  description?: string;
}
export interface getAllProjects {
  name: string;
  description?: string;
  created_at: string;
  id?: number;
}

export interface ProjectsPaginationParams {
  limit: number;
  offset: number;
  projectId?: string;
}

export interface ProjectsPaginationMeta {
  totalCount: number;
  startIndex: number | null;
  endIndex: number | null;
}
export type MemberRole = "owner" | "admin" | "member" | "viewer";

export interface Member {
  member_id: string;
  project_id: string;
  user_id: string;
  role: MemberRole;
  email: string;

  metadata: {
    name: string;
    email: string;
    job_title?: string;
    email_verified?: boolean;
    phone_verified?: boolean;
    sub?: string;
  };
}

export type addNewEpicForm = z.infer<typeof addNewEpicSchema>;
export interface addNewEpicData {
  title: string;
  description?: string;
  assignee_id?: string;
  project_id: string;
  deadline?: string;
}

export interface ListProjectEpics {
  id: string;
  epic_id: string;
  title: string;
  description?: string;
  deadline: string;
  created_at: string;

  created_by: {
    sub: string;
    name: string;
    email: string;
    department: string;
  };

  assignee: {
    sub: string;
    name: string;
    email: string;
    department: string;
  };
}
