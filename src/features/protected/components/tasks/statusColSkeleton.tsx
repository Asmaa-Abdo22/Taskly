export default function statusColSkeleton() {
  return (
    <div
      className="
        bg-white
        rounded-xl
        p-5
        min-h-35
        flex
        flex-col
        justify-between
        animate-pulse
      "
    >
      <div>
        <div className="h-6 w-64 rounded bg-slate-200" />
        <div className="mt-2 h-6 w-48 rounded bg-slate-200" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-slate-200" />
          <div className="h-4 w-14 rounded bg-slate-200" />
        </div>

        <div className="h-8 w-8 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}