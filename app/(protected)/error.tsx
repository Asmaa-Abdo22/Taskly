"use client";

import RouteState from "@/src/components/RouteState";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteState
      title="Something went wrong"
      description="Please try again."
      actionLabel="Try again"
      onAction={reset}
      className="min-h-[45vh]"
    />
  );
}
