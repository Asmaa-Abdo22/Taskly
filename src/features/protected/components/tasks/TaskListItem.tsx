import Link from "next/link";
import { ListProjectEpics, Task } from "../../types/protected.types";
import { formatDate, formatDate2 } from "../../utils/formatDate";
import { getAvatarInitials } from "../../utils/getAvatarInitials";
import DateIcon from "@/src/icons/date.svg";
import PlusCircle from "@/src/icons/plusCircle.svg";
export default function TaskListItem({ task }: { task: Task }) {
  const assigneeName = task.assignee?.name ?? "Unassigned";
  return (
    <>
      <div
        className="
        flex
        items-center
        justify-between
        px-6
        py-5
        border
        rounded-md
        border-slate-200
      "
      >
        <div className="flex items-center gap-4">
          <div>
            <h3
              className="
              text-[14px]
              md:text-base
              font-semibold
              text-slate-900
              leading-tight
            "
            >
              {task.title}
            </h3>

            <div className="flex items-center gap-2 mt-2">
              <div
                className="
                w-7
                h-7
                rounded-full
                bg-blue-100
                flex
                items-center
                justify-center
                text-[10px]
                font-bold
                text-blue-700
              "
              >
                {getAvatarInitials(assigneeName)}
              </div>

              <span className="text-[11px] md:text-body-md text-slate-500">
                {assigneeName}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right shrink-0 flex flex-col">
          <p
            className="
            text-[10px]
            uppercase
            font-bold
            tracking-wide
            text-slate-400
            hidden md:block
          "
          >
            Due Date
          </p>

         <div className="flex items-center gap-1">
             <DateIcon width={16} height={16} className="mt-7 md:hidden" />
               <p className=" mt-6 md:mt-1 text-[11px] md:text-body-md text-slate-700">
            {formatDate(task.due_date)}
          </p>

         </div>
        
        </div>
      </div>
      <Link
        href={`/project/${task.project_id}/tasks/new?epicId=${task.epic_id}`}
        className="
        cursor-pointer
        block md:hidden
                    mt-5
                    border
                   border-dashed
                   border-slate-300
                    text-center
                    py-3
                    rounded-md
                    font-bold
                    text-[12px]
                    text-slate-600
                    uppercase
                   tracking-widest
                  "
      >
        + Add New Task
      </Link>
    </>
  );
}
