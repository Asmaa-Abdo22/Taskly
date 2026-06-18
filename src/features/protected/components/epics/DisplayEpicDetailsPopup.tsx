"use client";

import CloseIcon from "@/src/icons/close.svg";
import DateIcon from "@/src/icons/date.svg";
import PersonIcon from "@/src/icons/person.svg";
import EpicModal from "@/src/icons/epics/epicModal.svg";
import TasksIcon from "@/src/icons/epics/tasksIcon.svg";

import { getAvatarInitials } from "../../utils/getAvatarInitials";
import { useGetEpicDetails } from "../../hooks/useGetEpicDetails";
import { formatDate2 } from "../../utils/formatDate";

export default function EpicDetailsModal({
  onClose,
  epicId,
}: {
  onClose: () => void;
  epicId: string;
}) {
  const {
    epic,
    title,
    description,
    assigneeId,
    deadline,
    setTitle,
    setDescription,
    projectMembers,
    isEditingAssignee,
    setIsEditingAssignee,
    savingField,
    saveTitle,
    saveDescription,
    saveAssignee,
    saveDeadline,
  } = useGetEpicDetails(epicId);

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]" />

      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            w-full
            max-w-190
            overflow-hidden
            rounded-xl
            bg-blue-200
            shadow-md
          "
        >
          <div className="p-5 md:p-8 bg-surface-low">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex gap-1 items-center">
                  <EpicModal
                    width={18}
                    height={18}
                    className="hidden md:block"
                  />

                  <span
                    className="
                      text-[10px]
                      md:text-[12px]
                      font-bold
                      uppercase
                      tracking-wide
                      text-primaryy
                      md:text-slate-400
                    "
                  >
                    {epic?.epic_id}
                  </span>
                </div>
                {/* TITLE */}
                <input
                  className="
                    hidden
                    md:block
                    mt-2
                    text-[24px]
                    leading-tight
                    font-bold
                    text-slate-900
                    border
                    border-transparent
                    focus:border-[#d7e2ff]
                    disabled:cursor-not-allowed
                    rounded-md focus:outline-none transition-colors px-3 py-2
                  "
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={saveTitle}
                  disabled={savingField === "title"}
                />

                <input
                  className="
                    md:hidden
                    block
                    mt-2
                    text-[20px]
                    leading-tight
                    font-bold
                    text-slate-900
                     disabled:cursor-not-allowed
                     border-transparent
                     border
                    focus:border-[#d7e2ff]
                    rounded-md focus:outline-none transition-colors px-3 py-2
                  "
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={saveTitle}
                  disabled={savingField === "title"}
                />
              </div>

              <button
                onClick={onClose}
                className="
                  h-10
                  w-10
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                "
              >
                <CloseIcon width={18} height={18} />
              </button>
            </div>
          </div>

          <div className="bg-slate-50 p-5 md:p-8">
            <div className="md:hidden block">
              <p
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-700
                  mb-2
                "
              >
                Description
              </p>
              {/* Description */}
              <textarea
                className="text-slate-700 text-body-md border 
                    focus:border-[#d7e2ff] border-transparent rounded-md focus:outline-none  transition-colors resize-none h-10 px-3 py-2"
                value={description}
                placeholder="No description provided"
                onChange={(e) => setDescription(e.target.value)}
                onBlur={saveDescription}
                disabled={savingField === "description"}
              />
            </div>

            <textarea
              value={description}
              placeholder="No description provided"
              onChange={(e) => setDescription(e.target.value)}
              onBlur={saveDescription}
              disabled={savingField === "description"}
              className="hidden md:block font-normal text-[16px] text-blue-950/80 border 
                    focus:border-[#d7e2ff]  border-transparent rounded-md focus:outline-none  transition-colors resize-none h-10 px-3 py-2 "
            />

            <div
              className="
                mt-8
                grid
                grid-cols-2
                md:grid-cols-4
                gap-x-8
                gap-y-6
              "
            >
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500 md:text-slate-400">
                  Created By
                </p>

                <div className="flex items-center gap-2">
                  <div
                    className="
                      w-7
                      h-7
                      p-2
                      bg-[#0052CC]
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      text-white
                      text-[10px]
                      font-bold
                    "
                  >
                    {getAvatarInitials(epic?.created_by?.name ?? "")}
                  </div>

                  <span className="text-body-md text-slate-900">
                    {epic?.created_by?.name}
                  </span>
                </div>
              </div>
              {/* Assignee */}
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500 md:text-slate-400">
                  Assignee
                </p>

                <div
                  className="flex items-center gap-2 "
                  onClick={() => setIsEditingAssignee(true)}
                >
                  {isEditingAssignee ? (
                    <select
                      className="text-body-md text-slate-900 disabled:cursor-not-allowed bg-red-400"
                      value={assigneeId || ""}
                      onChange={(e) =>
                        saveAssignee(e.target.value ? e.target.value : null)
                      }
                      disabled={savingField === "assignee_id"}
                      autoFocus
                    >
                      <option value="">Unassigned</option>
                      {projectMembers.map((member) => (
                        <option key={member.user_id} value={member.user_id}>
                          {member.metadata.name}
                        </option>
                      ))}
                    </select>
                  ) : epic?.assignee ? (
                    <>
                      <div
                        className="
                          w-7
                          h-7
                          p-2
                          bg-surface-low
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          text-slate-900
                          text-[10px]
                          font-bold
                        "
                      >
                        {getAvatarInitials(epic.assignee.name)}
                      </div>

                      <span className="text-body-md text-slate-900">
                        {epic.assignee.name}
                      </span>
                    </>
                  ) : (
                    <>
                      <div
                        className="
                          w-7
                          h-7
                          p-2
                          bg-surface-low
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          text-white
                          text-[10px]
                          font-bold
                        "
                      >
                        <PersonIcon width={14} height={14} />
                      </div>

                      <span className="text-body-md text-slate-900">
                        Unassigned
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500 md:text-slate-400">
                  Deadline
                </p>
                {/* Deadline */}
                <div className="flex items-center gap-1">
                  {/* <DateIcon width={16} height={16} className="mt-1" /> */}

                  <input
                    type="date"
                    className="text-body-md text-slate-900 disabled:cursor-not-allowed"
                    value={deadline}
                    onChange={(e) => {
                      saveDeadline(e.target.value);
                    }}
                    disabled={savingField === "deadline"}
                  />
                </div>
              </div>

              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500 md:text-slate-400">
                  Created At
                </p>

                <div className="flex items-center gap-1">
                  <DateIcon width={16} height={16} className="mt-1" />

                  <span className="text-body-md text-slate-900">
                    {epic?.created_at ? formatDate2(epic.created_at) : "-"}
                  </span>
                </div>
              </div>
            </div>

            <div className="my-6 border-t border-slate-200" />

            <div className="flex items-center justify-between">
              <h3
                className="
                  text-[11px]
                  md:text-[18px]
                  font-semibold
                  uppercase
                  tracking-wide
                  md:text-slate-900
                  text-slate-700
                "
              >
                Tasks
              </h3>

              <div
                className="
                  rounded-full
                  bg-slate-200
                  px-3
                  py-1
                  text-[11px]
                  font-semibold
                  text-slate-600
                "
              >
                0 TASKS
              </div>
            </div>

            <div
              className="
                mt-4
                rounded-2xl
                border
                border-dashed
                border-slate-300
                bg-surface-low
                p-8
                md:p-12
              "
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="
                    h-14
                    w-14
                    rounded-2xl
                    bg-blue-100
                    flex
                    items-center
                    justify-center
                    mb-5
                  "
                >
                  <TasksIcon width={18} height={18} />
                </div>

                <p
                  className="
                    text-sm
                    md:text-base
                    leading-6
                    text-slate-700
                  "
                >
                  No tasks have been added to this epic yet
                </p>

                <button
                  className="
                    mt-5
                    btn
                    btn-primaryy
                  "
                >
                  + Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
