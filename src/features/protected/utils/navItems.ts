import details from "@/src/icons/details.png";
import epic from "@/src/icons/epic.png";
import members from "@/src/icons/members.png";
import projects from "@/src/icons/projects.png";
import tasks from "@/src/icons/tasks.png";
import type { NavItem } from "../types/protected.types";

export const navItems: NavItem[] = [
  { name: "Projects", icon: projects, path: "/project" },
  { name: "Project Epics", icon: epic, path: "/epics" },
  { name: "Project Tasks", icon: tasks, path: "/tasks" },
  { name: "Project Members", icon: members, path: "/members" },
  { name: "Project Details", icon: details, path: "/details" },
];
