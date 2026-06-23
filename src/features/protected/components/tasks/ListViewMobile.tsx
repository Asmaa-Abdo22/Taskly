import Link from "next/link";

export default function ListViewMobile() {
  return (
    <>
      <Link
        href={`/project/{projectId}/tasks/new?epicId={epicIdParam}`}
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
        <div className="rounded-2xl  bg-white p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400/90">
                TASK-125
              </p>

              <h3 className="mt-2 text-body-md font-medium text-slate-900">
                Develop responsive bento grid components
              </h3>
            </div>

            <span className="whitespace-nowrap rounded-md bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700">
              In Progress
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primaryy text-xs font-semibold text-white">
                AA
              </div>

              <div>
                <p className="text-xs uppercase font-bold tracking-wide text-slate-600">
                  Due Date
                </p>

                <p className="mt-1 font-medium text-xs text-slate-900">
                  Oct 25, 2025
                </p>
              </div>
            </div>

            <button className="text-lg text-slate-500">⋮</button>
          </div>
        </div>
      </div>
    </>
  );
}
