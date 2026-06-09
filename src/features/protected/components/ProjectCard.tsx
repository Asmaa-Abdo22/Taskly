import { getAllProjects } from "../types/protected.types";
import { formatDate } from "../utils/formatDate";

export default function ProjectCard({ project }: { project: getAllProjects }) {
  return (
    <div className="bg-white rounded-lg p-6  ">
      {/* Title */}
      <h2 className="text-title-md text-slate-900 leading-snug">
        {project.name}
      </h2>

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
    </div>
  );
}
