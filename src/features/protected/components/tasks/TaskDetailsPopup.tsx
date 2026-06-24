import { useAppDispatch } from "@/src/store/hooks";
import { closeTaskDetails } from "../../slices/taskDetailsSlice";
import GreenRight from "@/src/icons/greenRight.png";
import Graduate from "@/src/icons/Graduate.svg";
import Date from "@/src/icons/date.svg";
import Reset from "@/src/icons/resetpass.png";
import Image from "next/image";
const TaskDetailsPopup = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div
        onClick={() => dispatch(closeTaskDetails())}
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
          {/* DESKTOP */}
          <div className="hidden md:grid h-full grid-cols-[1fr_320px]">
            {/* Left Side */}
            <div className="flex flex-col">
              {/* Header */}
              <div className="border-b border-slate-200 p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-md text-primaryy bg-blue-100 px-3 py-1 text-xs font-bold ">
                    TASK-125
                  </span>

                  <Graduate className="ml-4 -mr-2" width={15} height={15} />

                  <span className="text-sm font-medium text-slate-600">
                    EPIC-102 (Core UI Overhaul)
                  </span>
                </div>

                <h1 className="max-w-3xl text-3xl font-bold leading-tight text-slate-900">
                  Implement glassmorphism effect on modals
                </h1>
              </div>

              {/* Description */}
              <div className="flex-1 p-8 overflow-y-auto">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-600">
                  Description
                </h3>

                <p className="max-w-3xl font-normal text-sm text-slate-900 leading-8">
                  Detailed task description goes here. This involves updating
                  the modal container background to use semi-transparent surface
                  colors with a 20px backdrop-blur to align with the Digital
                  Curator aesthetic. Ensure contrast ratios remain accessible.
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
                  onClick={() => dispatch(closeTaskDetails())}
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
                      className="  border border-green-300
                      focus:outline-none
                      focus:ring-0
                      focus:border-green-300 bg-green-300 font-bold text-xs w-full rounded-sm text-green-900 px-4 py-3"
                    >
                      <option value="">COMPLETED</option>
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
                        MT
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">
                          Mahmoud Taha
                        </h4>

                        <p className="text-xs text-slate-600 font-normal">
                          Senior Frontend Engineer
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
                      AS
                    </div>

                    <span className="text-sm text-slate-900 font-medium">
                      Alex Sterling
                    </span>
                  </div>
                </div>

                <hr className="border-slate-200" />

                {/* Dates */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Due Date</span>

                    <span className="font-medium text-sm text-slate-900">
                      22 Oct 2025
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Created At</span>

                    <span className="font-medium text-sm text-slate-900">
                      10 Oct 2025
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
                  TASK-125
                </span>

                <button
                  onClick={() => dispatch(closeTaskDetails())}
                  className="cursor-pointer text-2xl text-slate-500"
                >
                  ×
                </button>
              </div>

              {/* Title */}
              <h1 className="mb-5 text-[24px] font-semibold leading-tight text-slate-900">
                Implement glassmorphism effect on modals
              </h1>

              {/* Status + Epic */}
              <div className="mb-8 flex flex-wrap gap-2">
                <span className="flex items-center gap-2 rounded-full bg-green-300 px-3 py-1 text-xs font-bold text-green-900">
                  <Image src={GreenRight} alt="right" width={16} height={16} />
                  COMPLETED
                </span>

                <span className="flex items-center gap-1 rounded-full bg-surface-highest px-3 py-1 text-xs font-bold text-slate-700">
                  <Graduate width={15} height={15} />
                  EPIC-102
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
                      MT
                    </div>

                    <span className="text-sm font-medium text-slate-900">
                      Mike Kern
                    </span>
                  </div>
                </div>

                {/* Due Date */}
                <div className="rounded-xl bg-surface-low p-4">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Due Date
                  </p>

                  <div className="flex items-center ">
                    <Date
                      className="text-primaryy mt-1"
                      stroke="currentColor"
                      width={15}
                      height={15}
                    />
                    <p className="text-sm font-medium text-slate-900">
                      22 Oct 2025
                    </p>
                  </div>
                </div>

                {/* Created By */}
                <div className="rounded-xl bg-surface-low p-4">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Created By
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                      AS
                    </div>

                    <span className="text-sm font-medium text-slate-900">
                      Alex Sterling
                    </span>
                  </div>
                </div>

                {/* Created At */}
                <div className="rounded-xl bg-surface-low p-4">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Created At
                  </p>

                  <div className="flex items-center gap-1">
                    <Image
                      src={Reset}
                      alt="reset"
                      className=" "
                      width={11}
                      height={11}
                    />
                    <p className="text-sm font-medium text-slate-900">
                      22 Oct 2025
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
                    Detailed task description goes here. Ensure all layers use
                    the prescribed tonal shifts instead of borders. Focus on
                    high-quality visual polish and editorial spacing for better
                    readability on small screens.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetailsPopup;
