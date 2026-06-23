"use client";

import StatusColumn from "./StatusColumn";

const STATUSES = [
  {
    status: "TO_DO",
    title: "TO DO",
    circleColor: "bg-slate-300",
    countBg: "bg-surface-highest",
  },
  {
    status: "IN_PROGRESS",
    title: "IN PROGRESS",
    circleColor: "bg-blue-800",
    countBg: "bg-surface-highest",
  },
  {
    status: "BLOCKED",
    title: "BLOCKED",
    circleColor: "bg-red-700",
    countBg: "bg-red-100",
  },
  {
    status: "IN_REVIEW",
    title: "IN REVIEW",
    circleColor: "bg-yellow-500",
    countBg: "bg-surface-highest",
  },
  {
    status: "READY_FOR_QA",
    title: "READY FOR QA",
    circleColor: "bg-purple-700",
    countBg: "bg-surface-highest",
  },
  {
    status: "REOPENED",
    title: "REOPENED",
    circleColor: "bg-orange-500",
    countBg: "bg-surface-highest",
  },
  {
    status: "READY_FOR_PRODUCTION",
    title: "READY FOR PRODUCTION",
    circleColor: "bg-green-700",
    countBg: "bg-surface-highest",
  },
  {
    status: "DONE",
    title: "DONE",
    circleColor: "bg-green-500",
    countBg: "bg-surface-highest",
  },
];

export default function BoardView({
  projectId,
}: {
  projectId: string;
}) {
  return (
    <div className="hidden md:grid grid-flow-col auto-cols-[280px] gap-3 overflow-x-auto py-3">
      {STATUSES.map((column) => (
        <StatusColumn
          key={column.status}
          projectId={projectId}
          {...column}
        />
      ))}
     
    </div>
  );
}