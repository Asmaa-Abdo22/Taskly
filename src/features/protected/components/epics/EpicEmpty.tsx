"use client";

import Link from "next/link";

import EpicPage from "@/src/icons/epics/epicpage.svg";
import Goals from "@/src/icons/epics/goals.svg";
import Design from "@/src/icons/epics/design.svg";
import Container from "@/src/icons/epics/Container.svg";
import Create from "@/src/icons/epics/create.svg";

const EpicEmpty = ({
  projectId,
  title = "No epics found for this project",
}: {
  projectId: string;
  title?: string;
}) => {
  return (
    <div className="w-full min-h-[calc(100vh-180px)] flex flex-col items-center justify-center px-4 ">
      {/* Illustration */}
      <div className="mb-7 p-5  bg-white flex items-center justify-center ">
        <EpicPage width={200} height={200} aria-hidden="true" />
      </div>

      {/* Title */}
      <h2 className="text-center text-[20px] md:text-[22px] font-semibold text-slate-900">
        {title}
      </h2>

      {/* Description */}
      <p className="mt-4 max-w-105 text-center text-sm md:text-base leading-7 text-slate-500">
        Break down your large project into manageable epics to track progress
        better and maintain architectural clarity.
      </p>

      {/* Button */}
      <Link
        href={`/project/${projectId}/epics/new`}
        className="
          mt-5
          flex
          items-center
          justify-center
          gap-2
          w-55
          h-12
          rounded-md
          bg-primaryy
          text-white
          shadow-md
          transition-opacity
          hover:opacity-90
        "
      >
        <Create width={18} height={18} />
        <span className="font-medium">Create First Epic</span>
      </Link>

      {/* Feature Cards */}
      <div className="mt-14 flex flex-wrap justify-center gap-5 w-full max-w-225">
        {/* Card 1 */}
        <div className="w-45 rounded-lg bg-slate-200 p-4">
          <Goals width={22} height={22} />

          <h3 className="mt-4 text-sm font-semibold text-slate-900">
            High-Level Goals
          </h3>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            Define the broad objectives that span across multiple cycles.
          </p>
        </div>

        {/* Card 2 */}
        <div className="w-45 rounded-lg bg-slate-200 p-4">
          <Design width={22} height={22} />

          <h3 className="mt-4 text-sm font-semibold text-slate-900">
            Hierarchy Design
          </h3>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            Link individual tasks to parent epics for a consolidated view.
          </p>
        </div>

        {/* Card 3 */}
        <div className="w-45 rounded-lg bg-slate-200 p-4">
          <Container width={22} height={22} />

          <h3 className="mt-4 text-sm font-semibold text-slate-900">
            Track Velocity
          </h3>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            Visualize percentage completion at a macro project level.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EpicEmpty;
