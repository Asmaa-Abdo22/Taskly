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
      className={`flex min-h-[55vh] w-full items-center justify-center px-4 ${className}`}
    >
      <div className="formStyle bg-white w-full max-w-md p-8 md:p-12 items-center text-center">
        {loading && (
          <div className="mb-4">
            <LoadingSpinner />
          </div>
        )}

        <h1 className="text-[24px] md:text-headline-lg font-semibold text-slate-900">
          {title}
        </h1>

        {description && (
          <p className="text-[14px] text-slate-700 mt-2 mb-6">
            {description}
          </p>
        )}

        {actionLabel && actionHref && (
          <Link href={actionHref} className={actionClassName}>
            {actionLabel}
          </Link>
        )}

        {actionLabel && onAction && (
          <button type="button" onClick={onAction} className={actionClassName}>
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
