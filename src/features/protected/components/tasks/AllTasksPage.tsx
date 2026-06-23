"use client";
import Link from "next/link";
import SearchIcon from "@/src/icons/search.svg";
import Dashboard from "@/src/icons/dashboard.svg";
import List from "@/src/icons/list.svg";
import ViewIcon from "@/src/icons/view.png";
import Image from "next/image";
import BoardView from "./BoardView";
import { useGeTasksView } from "../../hooks/useGetTasksView";
import { useRouter, useSearchParams } from "next/navigation";
import ListView from "./ListView";
export default function AllTasksPage() {
  const viewType = useSearchParams().get("view") as string;
  const { projectId, allTasksView } = useGeTasksView();
  const router = useRouter();
  const changeTypeInSelcet = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/project/${projectId}/tasks?view=${e.target.value}`);
  };
  return (
    <>
      <div className="allTasks md:px-0 px-5">
        {/* HEADER */}
        <nav className="hidden md:block">
          <Link
            href="/project"
            className="text-slate-600 uppercase text-label-sm tracking-[1.2px]"
          >
            Projects
          </Link>
          <span className="text-slate-600 text-sm"> &gt; </span>
          <Link
            href={`/project/${projectId}/edit`}
            className="text-slate-600 uppercase text-label-sm tracking-[1.2px]"
          >
            project alpha
          </Link>
          <span className="text-slate-600 text-sm"> &gt; </span>
          <span className="text-label-sm  uppercase text-primaryy tracking-[1.2px]">
            Tasks
          </span>
        </nav>
        <div className="title flex md:items-center justify-between mt-2 mb-4 flex-col md:flex-row">
          <div className="  flex  items-start mt-2 mb-4 flex-col ">
            <h1 className=" text-slate-900 text-[36px] headlineLgWeight">
              Active Workboard
            </h1>
            <p className="text-body-md md:text-[16px] text-slate-700 leading-relaxed">
              Curating Project Alpha's production pipeline and milestones.
            </p>
          </div>

          <div className="flex gap-4 items-center flex-1">
            <div className="text-center md:text-end flex-1 h-full">
              <div className="flex items-center relative justify-end">
                <SearchIcon
                  width={30}
                  height={30}
                  className="absolute md:left-80 left-2 top-1/2 mt-2.5 md:mt-2.8 -translate-y-1/2"
                />

                <input
                  id="searchEpics"
                  type="text"
                  placeholder="Search Epics..."
                  className="w-full md:w-1/2 md:pl-6 pl-6 placeholder:text-[#737685] px-3 py-4 text-body-md text-slate-900 bg-surface-highest border-transparent rounded-md focus:outline-none transition-colors"
                />
              </div>
            </div>
            {/* view selcet */}
            <select
              value={viewType || "board"}
              onChange={changeTypeInSelcet}
              name=""
              id="selectView"
              className="bg-white h-full hidden md:block cursor-pointer py-3 rounded-md px-4 text-[14px] text-slate-900"
            >
              <option value="board">Board View</option>
              <option value="list">List View</option>
            </select>

            {/* icons */}
            <div className=" justify-center items-center bg-surface-highest rounded-md hidden md:flex py-2 px-3 cursor-pointer">
              <Image src={ViewIcon} alt="view" width={20} height={20} />
            </div>
          </div>
        </div>

        {/* BODY */}
        {viewType === "board" ? (
          <BoardView projectId={projectId} />
        ) : (
          viewType === "list" && <ListView />
        )}
      </div>
    </>
  );
}
