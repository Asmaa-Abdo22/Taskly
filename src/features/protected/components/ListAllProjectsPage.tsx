"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import PlusIcon from "@/src/icons/plus.svg";
import PlusCircle from "@/src/icons/plusCircle.svg";

import { useGetAllProjects } from "../hooks/useGetAllProjects";
import type { getAllProjects as ProjectType } from "../types/protected.types";

import ProjectsSkeleton from "./ProjectsSkeleton";
import ProjectCard from "./ProjectCard";
import EmptyState from "./EmptyState";

const ListAllProjectsPage = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const { loading, getAllProjects } = useGetAllProjects();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllProjects();
      setProjects(res?.result || []);
    };

    fetchData();
  }, []);

  if (!loading && projects.length === 0) {
    return (
      <EmptyState
        title="No Projects"
        description="You don’t have any projects yet. Start by defining your first workspace."
        buttonText="Create New Project"
        href="/project/add"
      />
    );
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
          className="md:hidden fixed bottom-17.5 right-5 h-10 w-10 rounded-md btn-primaryy flex items-center justify-center"
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
              <ProjectCard project={project} key={project.id} />
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
    </div>
  );
};

export default ListAllProjectsPage;