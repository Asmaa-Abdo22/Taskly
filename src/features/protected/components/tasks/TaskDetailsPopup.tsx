import { useAppDispatch } from "@/src/store/hooks";
import { closeTaskDetails } from "../../slices/taskDetailsSlice";

const TaskDetailsPopup = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div
        onClick={() => dispatch(closeTaskDetails())}
        className="cursor-pointer fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="grid h-full grid-cols-[1fr_320px]">
            {/* Left Side */}
            <div className="flex flex-col">
              {/* Header */}
              <div className="border-b border-slate-200 p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-md bg-primaryy/10 px-3 py-1 text-xs font-bold text-primaryy">
                    TASK-125
                  </span>

                  <span className="text-slate-400">◈</span>

                  <span className="text-sm text-slate-600">
                    EPIC-102 (Core UI Overhaul)
                  </span>
                </div>

                <h1 className="max-w-3xl text-5xl font-bold leading-tight text-slate-900">
                  Implement glassmorphism effect on modals
                </h1>
              </div>

              {/* Description */}
              <div className="flex-1 p-8 overflow-y-auto">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Description
                </h3>

                <p className="max-w-3xl text-slate-700 leading-8">
                  Detailed task description goes here. This involves updating
                  the modal container background to use semi-transparent surface
                  colors with a 20px backdrop-blur to align with the Digital
                  Curator aesthetic. Ensure contrast ratios remain accessible.
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-slate-200 px-8 py-5">
                <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-primaryy">
                  🔗
                  <span>Copy link</span>
                </button>

                <button onClick={() => dispatch(closeTaskDetails())} className="cursor-pointer rounded-lg bg-primaryy/10 px-5 py-2 text-sm font-medium text-primaryy">
                  Close
                </button>
              </div>
            </div>

            {/* Right Side */}
            <aside className="border-l border-slate-200 bg-slate-50 p-6">
              <div className="space-y-8">
                {/* Status */}
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Status
                  </p>

                  <div className="flex items-center justify-between rounded-lg bg-green-200 px-4 py-3">
                    <span className="text-sm font-bold text-green-900">
                      COMPLETED
                    </span>

                    <span>⌄</span>
                  </div>
                </div>

                {/* Assignee */}
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Assignee
                  </p>

                  <div className="rounded-xl bg-white p-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primaryy/10 text-xs font-bold text-primaryy">
                        MT
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-900">
                          Mahmoud Taha
                        </h4>

                        <p className="text-xs text-slate-500">
                          Senior Frontend Engineer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reporter */}
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Reporter
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                      AS
                    </div>

                    <span className="text-sm text-slate-900">
                      Alex Sterling
                    </span>
                  </div>
                </div>

                <hr className="border-slate-200" />

                {/* Dates */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Due Date</span>

                    <span className="font-medium text-slate-900">
                      22 Oct 2025
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Created At</span>

                    <span className="font-medium text-slate-900">
                      10 Oct 2025
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetailsPopup;
