"use client";
import DateIcon from "@/src/icons/date.svg";
import PlusIcon from "@/src/icons/plus.svg";
import SearchIcon from "@/src/icons/search.svg";
import Link from "next/link";
import { useParams } from "next/navigation";
import EpicCardDesktop from "./cardEpicDesktop";
import MobileEpicCard from "./CardEpicMobile";
import { useGetProjectEpics } from "../../hooks/useGetAllEpics";
import { useEffect, useState } from "react";
import { ListProjectEpics } from "../../types/protected.types";
import EpicSkeleton from "./EpicSkeleton";
import EpicEmpty from "./EpicEmpty";

const GetAllEpicsPage = () => {
  const params = useParams();
  const projectId = params.projectId as string;
  const [allEpics, setAllEpics] = useState<ListProjectEpics[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const { loading, getProjectEpics } = useGetProjectEpics();

  useEffect(() => {
    const loadEpics = async () => {
      if (!projectId) return;

      try {
        const res = await getProjectEpics(projectId);
        setAllEpics(res?.result ?? []);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      }
    };

    loadEpics();
  }, [projectId]);

  if (error) {
    throw error;
  }
  if (loading) {
    return <EpicSkeleton />;
  }
  if (allEpics.length === 0) {
    return <EpicEmpty projectId={projectId} />;
  }
  return (
    <>
      <div className="allEpics md:px-0 px-5 ">
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
            project name
          </Link>
          <span className="text-slate-600 text-sm"> &gt; </span>
          <span className=" text-label-sm  uppercase text-primaryy tracking-[1.2px]">
            epics
          </span>
        </nav>
        <div className="title  flex  md:items-center justify-between mt-2 mb-4 flex-col md:flex-row">
          <h1 className="hidden md:block text-slate-900 text-[36px] headlineLgWeight">
            Project Epics
          </h1>
          <div className=" flex gap-4 items-center flex-1">
            <div className="  text-center  md:text-end flex-1 h-full ">
              <div className="flex  items-center relative justify-end">
                <SearchIcon
                  width={30}
                  height={30}
                  className="absolute md:left-109 left-2 top-1/2  mt-2.5 md:mt-2.8 -translate-y-1/2 "
                />
                <input
                  id="searchEpics"
                  type="text"
                  placeholder="Search Epics..."
                  className={`w-full md:w-1/2 md:pl-6 pl-6  placeholder:text-[#737685] px-3 py-4 text-body-md text-slate-900 bg-surface-highest border-transparent rounded-md focus:outline-none transition-colors `}
                />
              </div>
            </div>
            <Link
              href={`/project/${projectId}/epics/new`}
              className="md:flex  items-center btn btn-primaryy hidden"
            >
              <PlusIcon width={24} height={24} className="mt-3" />
              <span>New Epic</span>
            </Link>
          </div>
        </div>
        {/* EPICS MAP */}
        {/* DESKTOP */}
        <div className="hidden md:grid  md:grid-cols-2 lg:grid-cols-3 gap-5 my-7">
          {allEpics.map((item) => (
            <EpicCardDesktop key={item.id} epic={item} />
          ))}
        </div>
        {/* MOBILE */}
        <div className="md:hidden grid   grid-cols-1  gap-5 my-7">
          {allEpics.map((item) => (
            <MobileEpicCard key={item.id} epic={item} />
          ))}
        </div>
        <Link
          href={`/project/${projectId}/epics/new`}
          className="md:hidden fixed bottom-18.75 right-5 h-10 w-10 rounded-lg btn-primaryy flex items-center justify-center"
        >
          <PlusIcon width={27} height={27} className="mt-3.5 ml-3.5" />
        </Link>
      </div>
    </>
  );
};

export default GetAllEpicsPage;
