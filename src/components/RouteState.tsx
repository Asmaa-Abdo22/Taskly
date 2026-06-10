"use client";

import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";

interface RouteStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  loading?: boolean;
  className?: string;
}

export default function RouteState({
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  loading = false,
  className = "",
}: RouteStateProps) {
  const actionClassName = "btn btn-primaryy text-[14px] md:text-[16px]";

 return (
  <div
    className={`flex min-h-[85vh] items-center justify-center px-4 ${className}`}
  >
    <div className=" bg-white w-full max-w-lg min-h-80 md:min-h-95 p-8 md:p-12 flex flex-col items-center justify-center text-center">
      {loading && (
        <div className="mb-6">
          <LoadingSpinner />
        </div>
      )}

      <h1 className="text-[24px] md:text-headline-lg font-semibold text-slate-900">
        {title}
      </h1>

      {description && (
        <p className="mt-3 mb-8 max-w-sm text-[14px] text-slate-700">
          {description}
        </p>
      )}

      {actionLabel && actionHref && (
        <Link href={actionHref} className={actionClassName}>
          {actionLabel}
        </Link>
      )}

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className={actionClassName}
        >
          {actionLabel}
        </button>
      )}
    </div>
  </div>
);
}
