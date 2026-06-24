import GreenRight from "@/src/icons/greenRight.png";
import Graduate from "@/src/icons/Graduate.svg";
import Date from "@/src/icons/date.svg";
import Reset from "@/src/icons/resetpass.png";
import Image from "next/image";
import TaskDetailsPopupSkeleton from "./TaskDetailsPopupSkeleton";
import { getAvatarInitials } from "../../utils/getAvatarInitials";
import { formatDate } from "../../utils/formatDate";
import { useTaskDetailsPopup } from "../../hooks/useGetTaskDetailsPopup";
import EmptyState from "../EmptyState";

const TaskDetailsPopup = () => {
  const { task, loading, error, currentStatus, closePopup, projectId } =
    useTaskDetailsPopup();
  if (error) {
    throw new Error("Failed to load task details");
  }
  return (
    <>
      <div
        onClick={() => closePopup()}
        className="cursor-pointer fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="
    w-full
    max-w-md md:max-w-4xl
    h-auto md:h-[90vh]
    overflow-hidden
    rounded-2xl
    bg-white
    shadow-xl
  "
        >
          {loading ? (
            <TaskDetailsPopupSkeleton />
          ) : !task ? (
            <EmptyState
              title="Task not found"
              description="The requested task could not be found."
              buttonText="Back to Tasks"
              href={`/project/${projectId}/tasks?view=board`}
            />
          ) : (
            <>
              {/* DESKTOP */}
              <div className="hidden md:grid h-full grid-cols-[1fr_320px]">
                {/* Left Side */}
                <div className="flex flex-col">
                  {/* Header */}
                  <div className="border-b border-slate-200 p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="rounded-md text-primaryy bg-blue-100 px-3 py-1 text-xs font-bold ">
                        {task?.task_id}
                      </span>

                      <Graduate className="ml-4 -mr-2" width={15} height={15} />

                      <span className="text-sm font-medium text-slate-600">
                        {task.epic?.epic_id ?? "-"} ({task?.epic?.title})
                      </span>
                    </div>

                    <h1 className="max-w-3xl text-3xl font-bold leading-tight text-slate-900">
                      {task?.title}
                    </h1>
                  </div>

                  {/* Description */}
                  <div className="flex-1 p-8 overflow-y-auto">
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-600">
                      Description
                    </h3>

                    <p className="max-w-3xl font-normal text-sm text-slate-900 leading-8">
                      {task?.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="bg-surface-low flex items-center justify-between border-t border-slate-200 px-8 py-5">
                    <button className="cursor-pointer flex items-center gap-2 text-sm text-slate-600 hover:text-primaryy">
                      🔗
                      <span className="text-slate-600 text-sm font-medium">
                        Copy link
                      </span>
                    </button>

                    <button
                      onClick={() => closePopup()}
                      className="cursor-pointer rounded-lg bg-surface-highest px-5 py-2 text-sm font-semibold text-slate-900"
                    >
                      Close
                    </button>
                  </div>
                </div>

                {/* Right Side */}
                <aside className="border-l border-slate-200 bg-surface-low p-6">
                  <div className="space-y-8">
                    {/* Status */}
                    <div>
                      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-600">
                        Status
                      </p>

                      <div className="flex items-center justify-between rounded-lg">
                        <select
                          name=""
                          id=""
                          className={` 
                      focus:outline-none
                      focus:ring-0
                      focus:border-none  font-bold text-xs w-full rounded-sm  px-4 py-3 ${currentStatus?.bgColor} ${currentStatus?.statusText}`}
                        >
                          <option value={task?.status}>
                            {task.status.replaceAll("_", " ")}
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Assignee */}
                    <div>
                      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-600">
                        Assignee
                      </p>

                      <div className="rounded-xl bg-white p-3 ">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-surface-highest text-xs font-bold text-slate-900">
                            {getAvatarInitials(task?.assignee?.name || "??")}
                          </div>

                          <div>
                            <h4 className="font-semibold text-slate-900 text-sm">
                              {task.assignee?.name ?? "Unassigned"}
                            </h4>

                            <p className="text-xs text-slate-600 font-normal">
                              {task?.assignee?.name ?? "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Reporter */}
                    <div>
                      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-600">
                        Reporter
                      </p>

                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-surface-highest text-xs font-bold text-slate-900">
                          {getAvatarInitials(task?.created_by?.name || "")}
                        </div>

                        <span className="text-sm text-slate-900 font-medium">
                          {task?.created_by?.name}
                        </span>
                      </div>
                    </div>

                    <hr className="border-slate-200" />

                    {/* Dates */}
                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Due Date</span>

                        <span className="font-medium text-sm text-slate-900">
                          {formatDate(task?.due_date ?? "") || undefined}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          Created At
                        </span>

                        <span className="font-medium text-sm text-slate-900">
                          {formatDate(task?.created_at ?? "")}
                        </span>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
              {/* MOBILE */}
              <div className="md:hidden bg-[#EDEFF3]">
                {/* Handle */}
                <div className="flex justify-center pt-3">
                  <div className="h-1 w-12 rounded-full bg-slate-200" />
                </div>

                <div className="p-6">
                  {/* Header */}
                  <div className="mb-3 flex items-start justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {task?.task_id}
                    </span>

                    <button
                      onClick={() => closePopup()}
                      className="cursor-pointer text-2xl text-slate-500"
                    >
                      ×
                    </button>
                  </div>

                  {/* Title */}
                  <h1 className="mb-5 text-[24px] font-semibold leading-tight text-slate-900">
                    {task?.title}
                  </h1>

                  {/* Status + Epic */}
                  <div className="mb-8 flex flex-wrap gap-2">
                    <span
                      className={`flex flex-row items-center gap-1 rounded-xl  px-3 py-1 text-xs font-bold ${currentStatus?.bgColor} ${currentStatus?.statusText}`}
                    >
                      {task.status === "DONE" && (
                        <Image
                          src={GreenRight}
                          alt="right"
                          width={16}
                          height={16}
                        />
                      )}
                      {task?.status.replaceAll("_", " ")}
                    </span>

                    <span className="flex items-center gap-1 rounded-full bg-surface-highest px-3 py-1 text-xs font-bold text-slate-700">
                      <Graduate width={15} height={15} />
                      {task.epic?.epic_id ?? "-"}
                    </span>
                  </div>

                  {/* Info Grid */}
                  <div className="mb-8 grid grid-cols-2 gap-3">
                    {/* Assignee */}
                    <div className="rounded-xl bg-surface-low p-4">
                      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Assignee
                      </p>

                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-2xl bg-surface-highest text-xs font-bold text-primaryy">
                          {getAvatarInitials(task?.assignee?.name || "??")}
                        </div>

                        <span className="text-sm font-medium text-slate-900">
                          {task.assignee?.name ?? "Unassigned"}
                        </span>
                      </div>
                    </div>

                    {/* Due Date */}
                    <div className="rounded-xl bg-surface-low p-4">
                      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Due Date
                      </p>

                      <div className="flex items-center gap-1">
                        <Date
                          className="text-primaryy mt-1"
                          stroke="currentColor"
                          width={15}
                          height={15}
                        />

                        <p className="text-sm font-medium text-slate-900">
                          {formatDate(task?.due_date ?? "") || "-"}
                        </p>
                      </div>
                    </div>

                    {/* Created By */}
                    <div className="rounded-xl bg-surface-low p-4">
                      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Created By
                      </p>

                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-highest text-xs font-bold text-slate-700">
                          {getAvatarInitials(task?.created_by?.name || "")}
                        </div>

                        <span className="text-sm font-medium text-slate-900">
                          {task?.created_by?.name}
                        </span>
                      </div>
                    </div>

                    {/* Created At */}
                    <div className="rounded-xl bg-surface-low p-4">
                      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Created At
                      </p>

                      <div className="flex items-center gap-1">
                        <Image src={Reset} alt="reset" width={11} height={11} />

                        <p className="text-sm font-medium text-slate-900">
                          {formatDate(task?.created_at ?? "") || "-"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="pb-6">
                    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-600">
                      Description
                    </p>

                    <div className="rounded-xl bg-white p-4">
                      <p className="text-sm leading-7 text-slate-800">
                        {task?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskDetailsPopup;
