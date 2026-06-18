import DateIcon from "@/src/icons/date.svg";
import DotsIcon from "@/src/icons/dots.svg";
import PersonIcon from "@/src/icons/person.svg";
import { ListProjectEpics } from "../../types/protected.types";
import { getAvatarInitials } from "../../utils/getAvatarInitials";
import { formatDate } from "../../utils/formatDate";

export default function EpicCardDesktop({
  epic,
  onClick,
  
}: {
  epic: ListProjectEpics;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      role="button"
      className="cursor-pointer  rounded-xl p-5 border-l-5 border-[#004E32] shadow-sm"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <span className="px-3 py-1 rounded bg-green-300 text-green-800 text-label-sm font-semibold">
          {epic.epic_id}
        </span>

        <button className="cursor-pointer">
          <DotsIcon width={20} height={20} />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-slate-900 text-[20px] font-semibold leading-tight mb-6">
        {epic.title}
      </h3>

      {/* Assignee */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-green-400 flex items-center justify-center font-bold text-slate-900 text-[14px]">
          {getAvatarInitials(epic.assignee?.name || "")}
        </div>

        <div>
          <p className=" text-slate-600 font-medium text-[12px]">Assignee</p>
          <p className="text-[14px] font-semibold text-slate-900">
            {epic.assignee?.name || "Unassigned"}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
        <div className="flex items-center text-[12px] font-normal">
          <PersonIcon width={22} height={22} className="mt-2.5" />
          <p className="text-sm text-slate-400">Created by:</p>
          <p className="ml-2 "> {epic.created_by.name}</p>
        </div>

        <div className="flex items-center gap-2 text-[12px] text-slate-400 font-normal">
          <DateIcon width={16} height={16} className="mt-1 " />

          <span>{formatDate(epic.created_at)}</span>
        </div>
      </div>
    </div>
  );
}
