"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import PlusIcon from "@/src/icons/plus.svg";
import PlusCircle from "@/src/icons/plusCircle.svg";

import { useGetAllProjects } from "../hooks/useGetAllProjects";
import type { getAllProjects as ProjectType } from "../types/protected.types";

import ProjectsSkeleton from "./ProjectsSkeleton";
import ProjectCard from "./ProjectCard";
import EmptyState from "./EmptyState";

const PROJECTS_PAGE_LIMIT = 5;

const ListAllProjectsPage = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(PROJECTS_PAGE_LIMIT);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<Error | string>("");
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const latestRequestRef = useRef(0);
  const isFetchingRef = useRef(false);
  const { loading, paginationLoading, infiniteScrollLoading, getAllProjects } =
    useGetAllProjects();

  const totalPages = useMemo(
    () => Math.ceil(totalCount / limit),
    [limit, totalCount],
  );

  const pageNumbers = useMemo(() => {
    if (totalPages <= 2) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage === 1) {
      return [1, 2];
    }

    if (currentPage === totalPages) {
      return [totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  }, [currentPage, totalPages]);

  const hasNextPage = totalPages > 0 && currentPage < totalPages;
  const visibleProjectsCount = projects.length;

  const fetchProjects = useCallback(
    async (
      page: number,
      loadingType: "initial" | "pagination" | "infinite",
    ) => {
      if (isFetchingRef.current) {
        return;
      }

      isFetchingRef.current = true;
      const requestId = latestRequestRef.current + 1;
      latestRequestRef.current = requestId;
      const offset = (page - 1) * limit;

      try {
        setError("");
        const res = await getAllProjects({ limit, offset }, loadingType);

        if (latestRequestRef.current !== requestId || !res) {
          return;
        }

        const result = res.result || [];

        setTotalCount(
          (prevTotalCount) =>
            res.pagination.totalCount ||
            (result.length < limit
              ? offset + result.length
              : offset + limit + 1) ||
            prevTotalCount,
        );
        setCurrentPage(page);
        setProjects((prevProjects) =>
          loadingType === "infinite" ? [...prevProjects, ...result] : result,
        );
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        isFetchingRef.current = false;
      }
    },
    [getAllProjects, limit],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (isMobile === null) {
      return;
    }

    setProjects([]);
    setCurrentPage(1);
    fetchProjects(1, "initial");
  }, [fetchProjects, isMobile]);

  useEffect(() => {
    if (
      !isMobile ||
      loading ||
      infiniteScrollLoading ||
      !hasNextPage ||
      !observerRef.current
    ) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchProjects(currentPage + 1, "infinite");
      }
    });

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [
    currentPage,
    fetchProjects,
    hasNextPage,
    infiniteScrollLoading,
    isMobile,
    loading,
  ]);

  const handlePageChange = (page: number) => {
    if (page === currentPage || paginationLoading) {
      return;
    }

    fetchProjects(page, "pagination");
  };

  if (!loading && !error && projects.length === 0) {
    return (
      <EmptyState
        title="No projects found"
        description="You don’t have any projects yet. Start by defining your first workspace."
        buttonText="Create New Project"
        href="/project/add"
      />
    );
  }
  if (error) {
    throw error;
  }
  return (
    <div className="allProjects">
      {/* TITLE */}
      <div className="title flex justify-between md:items-center mt-2 mb-4 flex-col md:flex-row">
        <div>
          <h1 className="text-slate-900 text-[30px] headlineLgWeight">
            Projects
          </h1>
          <p className="text-[16px] text-slate-700 leading-relaxed">
            Manage and curate your projects
          </p>
        </div>

        <Link
          href="/project/add"
          className="md:flex items-center font-semibold text-[16px] btn btn-primaryy hidden"
        >
          <PlusIcon width={24} height={24} className="mt-3" />
          <span>Create New Project</span>
        </Link>

        <Link
          href="/project/add"
          className="md:hidden fixed bottom-18.75 right-5 h-10 w-10 rounded-md btn-primaryy flex items-center justify-center"
        >
          <PlusIcon width={27} height={27} className="mt-3.5 ml-3.5" />
        </Link>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <ProjectsSkeleton key={index} />
          ))
        ) : (
          <>
            {projects.map((project) => (
              <ProjectCard
                project={project}
                key={project.id ?? `${project.name}-${project.created_at}`}
              />
            ))}

            {projects.length > 0 && (
              <Link
                href="/project/add"
                className="bg-white rounded-lg p-6 hidden md:flex flex-col items-center justify-center"
              >
                <div className="bg-surface-low w-fit my-3 p-3 rounded-md flex items-center justify-center">
                  <PlusCircle width={20} height={20} />
                </div>

                <span className="text-[14px] font-bold tracking-widest text-slate-700 uppercase">
                  Add Project
                </span>
              </Link>
            )}
          </>
        )}
      </div>

      {isMobile && projects.length > 0 && (
        <div
          ref={observerRef}
          className="md:hidden grid grid-cols-1 gap-5 my-5"
        >
          {infiniteScrollLoading &&
            Array.from({ length: 2 }).map((_, index) => (
              <ProjectsSkeleton key={index} />
            ))}
        </div>
      )}

      {!isMobile && projects.length > 0 && totalPages > 1 && (
        <div className="hidden md:flex items-center justify-between mt-32 mb-8">
          <p className="text-body-md text-slate-700">
            Showing {visibleProjectsCount} of {totalCount} active projects
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous page"
              disabled={currentPage === 1 || paginationLoading}
              onClick={() => handlePageChange(currentPage - 1)}
              className="cursor-pointer h-8 w-8 border border-slate-300/40 bg-white text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ‹
            </button>

            {pageNumbers.map((page) => (
              <button
                type="button"
                key={page}
                disabled={paginationLoading}
                onClick={() => handlePageChange(page)}
                className={`cursor-pointer h-8 w-8 border border-slate-300/40 text-body-md disabled:cursor-not-allowed disabled:opacity-50 ${
                  page === currentPage
                    ? "bg-primaryy text-white"
                    : "bg-white text-slate-700"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              aria-label="Next page"
              disabled={!hasNextPage || paginationLoading}
              onClick={() => handlePageChange(currentPage + 1)}
              className="h-8 cursor-pointer w-8 border border-slate-300/40 bg-white text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListAllProjectsPage;
