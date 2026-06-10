"use client";
import { getAllProjects } from "../types/protected.types";
import { formatDate } from "../utils/formatDate";
import Link from "next/link";
import EditIcon from "@/src/icons/EditIcon.svg";
export default function ProjectCard({ project }: { project: getAllProjects }) {
  return (
    <Link
      href={`/project/${project.id}/epics`}
      className="bg-white rounded-lg p-3  "
    >
      <div className="flex items-center justify-between">
        {/* Title */}
        <h2 className="text-title-md text-slate-900 leading-snug">
          {project.name}
        </h2>
        <Link
          href={`/project/${project.id}/edit`}
          title="Edit"
          className="text-warning"
        >
          {" "}
          <EditIcon width={20} height={20} fill="currentColor" />
        </Link>
        {/* Efit Icon */}
      </div>

      {/* Description */}
      <p className="mt-3 text-body-md text-slate-700 leading-relaxed">
        {project.description}
      </p>

      {/* Divider */}
      <div className="my-5 border-t border-slate-300/40"></div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-label-sm text-slate-700 uppercase tracking-wide">
          Created at
        </span>

        <span className="text-body-md text-slate-600 font-medium">
          {formatDate(project.created_at)}
        </span>
      </div>
    </Link>
  );
}
