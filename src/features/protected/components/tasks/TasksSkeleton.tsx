export default function TasksSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
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
          <div>
            {/* Title */}
            <div className="h-4 md:h-5 w-32 md:w-48 rounded bg-slate-200" />

            {/* Assignee */}
            <div className="flex items-center gap-2 mt-2">
              <div className="w-7 h-7 rounded-full bg-slate-200" />
              <div className="h-3 md:h-4 w-20 rounded bg-slate-200" />
            </div>
          </div>

          {/* Due Date */}
          <div className="flex flex-col items-end">
            <div className="hidden md:block h-3 w-14 rounded bg-slate-200 mb-2" />

            <div className="flex items-center gap-1">
              <div className="md:hidden w-4 h-4 rounded bg-slate-200" />
              <div className="h-4 w-16 md:w-20 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      ))}

      {/* Mobile Add Task Button Skeleton */}
      <div
        className="
          block
          md:hidden
          h-12
          rounded-md
          border
          border-dashed
          border-slate-200
          bg-slate-100
        "
      />
    </div>
  );
}