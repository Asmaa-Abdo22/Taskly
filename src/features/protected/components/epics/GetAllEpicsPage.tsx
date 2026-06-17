"use client";
import DateIcon from "@/src/icons/date.svg";
import PlusIcon from "@/src/icons/plus.svg";
import SearchIcon from "@/src/icons/search.svg";
import Link from "next/link";
import EpicCardDesktop from "./cardEpicDesktop";
import MobileEpicCard from "./CardEpicMobile";
import { useGetProjectEpics } from "../../hooks/useGetAllEpics";
import EpicSkeleton from "./EpicSkeleton";
import EpicEmpty from "./EpicEmpty";
import Pagination from "../Pagination";
import EpicDetailsModal from "./DisplayEpicDetailsPopup";

const GetAllEpicsPage = () => {
  const {
    selectedEpicId,
    setSelectedEpicId,
    allEpics,
    error,
    loading,
    paginationLoading,
    infiniteScrollLoading,
    isMobile,
    observerRef,
    currentPage,
    totalPages,
    pageNumbers,
    projectId,
    totalCount,
    handlePageChange,
  } = useGetProjectEpics();

  if (!loading && !error && allEpics.length === 0) {
    return <EpicEmpty projectId={projectId} />;
  }

  if (error) {
    throw error;
  }
  if (loading) {
    return <EpicSkeleton />;
  }

  return (
    <div className="allEpics md:px-0 px-5">
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

        <span className="text-label-sm uppercase text-primaryy tracking-[1.2px]">
          epics
        </span>
      </nav>

      <div className="title flex md:items-center justify-between mt-2 mb-4 flex-col md:flex-row">
        <h1 className="hidden md:block text-slate-900 text-[36px] headlineLgWeight">
          Project Epics
        </h1>

        <div className="flex gap-4 items-center flex-1">
          <div className="text-center md:text-end flex-1 h-full">
            <div className="flex items-center relative justify-end">
              <SearchIcon
                width={30}
                height={30}
                className="absolute md:left-108 left-2 top-1/2 mt-2.5 md:mt-2.8 -translate-y-1/2"
              />

              <input
                id="searchEpics"
                type="text"
                placeholder="Search Epics..."
                className="w-full md:w-1/2 md:pl-6 pl-6 placeholder:text-[#737685] px-3 py-4 text-body-md text-slate-900 bg-surface-highest border-transparent rounded-md focus:outline-none transition-colors"
              />
            </div>
          </div>

          <Link
            href={`/project/${projectId}/epics/new`}
            className="md:flex items-center btn btn-primaryy hidden"
          >
            <PlusIcon width={24} height={24} className="mt-3" />
            <span>New Epic</span>
          </Link>
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-2 gap-5 my-7">
        {allEpics.map((item) => (
          <EpicCardDesktop
            key={item.id}
            epic={item}
            onClick={() => {
              setSelectedEpicId(item.id);
            }}
          />
        ))}
      </div>
      {selectedEpicId && (
        <EpicDetailsModal
          onClose={() => {
            setSelectedEpicId(null);
          }}
          epicId={selectedEpicId}
        />
      )}

      <div className="md:hidden grid grid-cols-1 gap-5 my-7">
        {allEpics.map((item) => (
          <MobileEpicCard
            key={item.id}
            epic={item}
            onClick={() => setSelectedEpicId(item.id)}
          />
        ))}
      </div>

      <Link
        href={`/project/${projectId}/epics/new`}
        className="md:hidden fixed bottom-18.75 right-5 h-10 w-10 rounded-lg btn-primaryy flex items-center justify-center"
      >
        <PlusIcon width={27} height={27} className="mt-3.5 ml-3.5" />
      </Link>

      {isMobile && allEpics.length > 0 && (
        <div
          ref={observerRef}
          className="md:hidden grid grid-cols-1 gap-5 my-5"
        >
          {infiniteScrollLoading && <EpicSkeleton />}
        </div>
      )}

      {/* DESKTOP PAGINATION */}
      {!isMobile && allEpics.length > 0 && totalPages > 1 && (
        <div className="hidden md:flex items-center justify-between mt-32 mb-8">
          <p className="text-body-md text-slate-700">
            Showing {allEpics.length} of {totalCount} active epics
          </p>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            loading={paginationLoading}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default GetAllEpicsPage;
