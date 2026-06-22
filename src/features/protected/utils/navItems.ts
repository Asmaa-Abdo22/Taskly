import details from "@/src/icons/details.png";
import epic from "@/src/icons/epic.png";
import members from "@/src/icons/members.png";
import projects from "@/src/icons/projects.png";
import tasks from "@/src/icons/tasks.png";
import type { NavItem } from "../types/protected.types";

export const getNavItems = (projectId?: string): NavItem[] => {
  const items: NavItem[] = [
    {
      name: "Projects",
      icon: projects,
      path: "/project",
    },
  ];

  if (!projectId) {
    return items;
  }

  return [
    ...items,
    {
      name: "Project Epics",
      icon: epic,
      path: `/project/${projectId}/epics`,
    },
    {
      name: "Project Tasks",
      icon: tasks,
      path: `/project/${projectId}/tasks`,
    },
    {
      name: "Project Members",
      icon: members,
      path: `/project/${projectId}/members`,
    },
    {
      name: "Project Details",
      icon: details,
      path: `/project/${projectId}/edit`,
    },
  ];
};
