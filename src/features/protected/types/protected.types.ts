import type { StaticImageData } from "next/image";
import { addNewProjectSchema } from "../schemas/addNewProjectSchema";
import type { z } from "zod";

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
