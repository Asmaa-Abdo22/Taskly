const MembersSkeleton = () => {
  return (
    <div className="w-full rounded-xl bg-white p-4">
      <div className="animate-pulse">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="mb-2 h-6 w-40 rounded bg-slate-200" />
            <div className="h-4 w-72 rounded bg-slate-200" />
          </div>

          <div className="h-10 w-32 rounded-lg bg-slate-200" />
        </div>

        {/* Table Container */}
        <div className="overflow-hidden rounded-xl border border-slate-100">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-6 border-b border-slate-100 px-6 py-4">
            <div className="h-4 w-16 rounded bg-slate-200" />
            <div className="h-4 w-20 rounded bg-slate-200" />
            <div className="h-4 w-16 rounded bg-slate-200" />
            <div className="h-4 w-12 rounded bg-slate-200" />
          </div>

          {/* Rows */}
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-6 border-b border-slate-100 px-6 py-5 last:border-b-0"
            >
              {/* Member */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-slate-200" />
                <div className="h-4 w-32 rounded bg-slate-200" />
              </div>

              {/* Email */}
              <div className="flex items-center">
                <div className="h-4 w-28 rounded bg-slate-200" />
              </div>

              {/* Role */}
              <div className="flex items-center">
                <div className="h-8 w-16 rounded-full bg-slate-200" />
              </div>

              {/* Action */}
              <div className="flex items-center">
                <div className="h-6 w-6 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembersSkeleton;