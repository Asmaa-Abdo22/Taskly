import Link from "next/link";
import { Task } from "../../types/protected.types";
import { formatDate } from "../../utils/formatDate";
import { getAvatarInitials } from "../../utils/getAvatarInitials";
import { STATUSES } from "./ListViewDesktop";
import { useAppDispatch } from "@/src/store/hooks";
import { openTaskDetails } from "../../slices/taskDetailsSlice";

export default function ListViewMobile({
  allTasks,
  projectId,
}: {
  allTasks: Task[];
  projectId: string;
}) {
  const dispatch = useAppDispatch();
  return (
    <>
      <Link
        href={`/project/${projectId}/tasks/new`}
        className="
        cursor-pointer
        lg:hidden block
                    text-center
                    py-2
                    rounded-md
                    font-semibold
                    text-[14px]
                    text-white
                    bg-primaryy
                    mb-4
                  
                  "
      >
        + Create Task
      </Link>
      <div className="space-y-4">
        {/* Card */}
        {allTasks.map((item) => {
          const taskStatus = STATUSES.find(
            (status) => status.status === item.status,
          );
          return (
            <div
              onClick={() => dispatch(openTaskDetails(item.id))}
              key={item.id}
              className="rounded-2xl cursor-pointer bg-white p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400/90">
                    {item.task_id}
                  </p>

                  <h3 className="mt-2 text-body-md font-medium text-slate-900">
                    {item.title}
                  </h3>
                </div>

                <span
                  className={`whitespace-nowrap rounded-md px-2 py-1 text-xs font-bold ${taskStatus?.bgColor} ${taskStatus?.statusText}`}
                >
                  {item.status.replaceAll("_", " ")}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primaryy text-xs font-semibold text-white">
                    {getAvatarInitials(item?.assignee?.name ?? "AA")}
                  </div>

                  <div>
                    <p className="text-xs uppercase font-bold tracking-wide text-slate-600">
                      Due Date
                    </p>

                    <p className="mt-1 font-medium text-xs text-slate-900">
                      {formatDate(item.due_date)}
                    </p>
                  </div>
                </div>

                <button className="text-lg text-slate-500">⋮</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
