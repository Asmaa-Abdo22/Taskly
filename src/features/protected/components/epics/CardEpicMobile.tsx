import DotsIcon from "@/src/icons/dots.svg";
import { ListProjectEpics } from "../../types/protected.types";
import { getAvatarInitials } from "../../utils/getAvatarInitials";
import { formatDate } from "../../utils/formatDate";

export default function MobileEpicCard({
  epic,
  onClick,
}: {
  epic: ListProjectEpics;
  onClick: () => void;
}) {
  return (
    <div onClick={onClick} className="bg-white rounded-xl p-4 ">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <span className="px-2 py-1 bg-surface-highest rounded  text-primaryy text-label-sm ">
          {epic.epic_id}
        </span>

        <button>
          <DotsIcon width={18} height={18} />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-slate-900 text-[18px] font-semibold leading-tight mb-5">
        {epic.title}
      </h3>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <div className="w-8 h-8 rounded-xl bg-primaryy text-white flex items-center justify-center text-[10px] font-bold">
            {getAvatarInitials(epic.assignee.name)}
          </div>

          <div>
            <p className="text-slate-900 text-[12px] font-medium">
              {epic.assignee.name}
            </p>
            <p className="text-xs text-slate-500">Assignee</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[10px] uppercase font-bold text-slate-600">
            Deadline
          </p>
          <p className="text-[12px] font-medium text-slate-900">
            {formatDate(epic.deadline)}
          </p>
        </div>
      </div>
    </div>
  );
}
