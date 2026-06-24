export default function TaskDetailsPopupSkeleton() {
  return (
    <div className="animate-pulse h-full w-full bg-[#F5F7FF] md:bg-transparent">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left Side */}
        <div className="flex-1 bg-white flex flex-col">
          {/* Mobile Handle */}
          <div className="flex justify-center py-2 md:hidden">
            <div className="h-1.5 w-12 rounded-full bg-slate-200" />
          </div>

          {/* Header */}
          <div className="p-4 md:p-8 border-b border-slate-200">
            {/* Task ID / Epic */}
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="h-6 md:h-8 w-20 rounded-lg bg-slate-200" />
              <div className="hidden md:block h-5 w-48 rounded bg-slate-200" />
            </div>

            {/* Title */}
            <div className="space-y-2 md:space-y-3">
              <div className="h-8 md:h-10 w-[90%] rounded bg-slate-200" />
              <div className="h-8 md:h-10 w-[70%] rounded bg-slate-200" />
            </div>

            {/* Mobile Chips */}
            <div className="flex gap-2 mt-5 md:hidden">
              <div className="h-8 w-28 rounded-full bg-slate-200" />
              <div className="h-8 w-24 rounded-full bg-slate-200" />
            </div>
          </div>

          {/* Mobile Info Cards */}
          <div className="grid grid-cols-2 gap-3 p-4 md:hidden">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl border border-slate-100 p-4"
              >
                <div className="h-3 w-16 rounded bg-slate-200 mb-3" />

                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-slate-200" />
                  <div className="h-4 flex-1 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="flex-1 p-4 md:p-8">
            <div className="h-5 w-28 rounded bg-slate-200 mb-6" />

            <div className="bg-white md:bg-transparent rounded-2xl md:rounded-none p-4 md:p-0 space-y-4">
              <div className="h-4 md:h-5 w-full rounded bg-slate-200" />
              <div className="h-4 md:h-5 w-[95%] rounded bg-slate-200" />
              <div className="h-4 md:h-5 w-[85%] rounded bg-slate-200" />
              <div className="h-4 md:h-5 w-[75%] rounded bg-slate-200" />
            </div>
          </div>

          {/* Desktop Footer */}
          <div className="hidden md:flex items-center justify-between p-8 border-t border-slate-200">
            <div className="h-8 w-32 rounded bg-slate-200" />
            <div className="h-12 w-28 rounded-xl bg-slate-200" />
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-90 bg-[#EEF2FF] border-l border-slate-200 p-8">
          {/* Status */}
          <div className="mb-10">
            <div className="h-5 w-20 rounded bg-slate-200 mb-4" />
            <div className="h-14 rounded-lg bg-slate-200" />
          </div>

          {/* Assignee */}
          <div className="mb-10">
            <div className="h-5 w-24 rounded bg-slate-200 mb-4" />

            <div className="bg-white rounded-2xl p-4 flex items-center gap-4">
              <div className="size-12 rounded-full bg-slate-200" />

              <div className="flex-1">
                <div className="h-5 w-32 rounded bg-slate-200 mb-2" />
                <div className="h-4 w-40 rounded bg-slate-200" />
              </div>
            </div>
          </div>

          {/* Reporter */}
          <div className="mb-10">
            <div className="h-5 w-24 rounded bg-slate-200 mb-4" />

            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-slate-200" />
              <div className="h-5 w-32 rounded bg-slate-200" />
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 space-y-8">
            <div className="flex justify-between">
              <div className="h-5 w-24 rounded bg-slate-200" />
              <div className="h-5 w-28 rounded bg-slate-200" />
            </div>

            <div className="flex justify-between">
              <div className="h-5 w-24 rounded bg-slate-200" />
              <div className="h-5 w-28 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
