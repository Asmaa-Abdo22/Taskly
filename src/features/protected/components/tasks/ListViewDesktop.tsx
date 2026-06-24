import PlusIcon from "@/src/icons/plus.svg";
import Link from "next/link";
import { Task } from "../../types/protected.types";
import { formatDate } from "../../utils/formatDate";
import { getAvatarInitials } from "../../utils/getAvatarInitials";
import { useAppDispatch } from "@/src/store/hooks";
import { openTaskDetails } from "../../slices/taskDetailsSlice";
export const STATUSES = [
  {
    status: "TO_DO",
    bgColor: "bg-slate-200",
    statusText: "text-slate-800",
  },
  {
  status: "IN_PROGRESS",
  bgColor: "bg-blue-100",
  statusText: "text-blue-700",
},
  {
    status: "BLOCKED",
    bgColor: "bg-red-100",
    statusText: "text-red-700",
  },
  {
    status: "IN_REVIEW",
    bgColor: "bg-yellow-100",
    statusText: "text-yellow-700",
  },
  {
    status: "READY_FOR_QA",
    bgColor: "bg-purple-100",
    statusText: "text-purple-700",
  },
  {
    status: "REOPENED",
    bgColor: "bg-orange-100",
    statusText: "text-orange-700",
  },
  {
    status: "READY_FOR_PRODUCTION",
    bgColor: "bg-green-100",
    statusText: "text-green-700",
  },
  {
    status: "DONE",
    bgColor: "bg-green-400",
    statusText: "text-slate-800",
  },
];
export default function ListViewDesktop({
  allTasks,
  projectId,
}: {
  allTasks: Task[];
  projectId: string;
}) {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-white">
        {/* Header */}
        <div className="grid grid-cols-[120px_1fr_180px_150px_150px_50px] border-b border-slate-200 px-6 py-4">
          <span className="text-label-sm uppercase tracking-wide text-slate-600">
            Task ID
          </span>

          <span className="text-label-sm uppercase tracking-wide text-slate-600">
            Title
          </span>

          <span className="text-label-sm uppercase tracking-wide text-slate-600">
            Status
          </span>

          <span className="text-label-sm uppercase tracking-wide text-slate-600">
            Due Date
          </span>

          <span className="text-label-sm uppercase tracking-wide text-slate-600">
            Assignee
          </span>

          <span />
        </div>

        {allTasks.map((item) => {
          const currentStatus = STATUSES.find(
            (status) => status.status === item.status,
          );

          return (
            <div
              onClick={() => dispatch(openTaskDetails(item.id))}
              key={item.id}
              className="grid cursor-pointer grid-cols-[120px_1fr_180px_150px_150px_50px] items-center px-6 py-5 hover:bg-slate-50 transition-colors"
            >
              <span className="font-normal text-primaryy text-body-md">
                {item.task_id}
              </span>

              <div>
                <h3 className="text-slate-900 font-medium text-sm">
                  {item.title}
                </h3>
              </div>

              <div>
                <span
                  className={`rounded-md px-3 py-1 text-xs font-bold ${currentStatus?.bgColor} ${currentStatus?.statusText}`}
                >
                  {item.status.replaceAll("_", " ")}
                </span>
              </div>

              <span className="text-slate-700 font-normal text-body-md">
                {formatDate(item.due_date)}
              </span>

              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-highest text-xs font-semibold text-slate-900">
                  {getAvatarInitials(item?.assignee?.name ?? "AA")}
                </div>

                <span className="text-slate-900 text-sm font-normal truncate">
                  {item?.assignee?.name}
                </span>
              </div>

              <button className="text-xl text-slate-500 cursor-pointer">
                ...
              </button>
            </div>
          );
        })}
      </div>

      <Link
        href={`/project/${projectId}/tasks/new`}
        className="lg:block fixed bottom-10 right-10 h-10 w-10 rounded-lg btn-primaryy flex items-center justify-center"
      >
        <PlusIcon width={27} height={27} className="mt-3.5 ml-3.5" />
      </Link>
    </>
  );
}
