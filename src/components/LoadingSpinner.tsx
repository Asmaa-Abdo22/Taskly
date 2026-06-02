"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-5 h-5 border-2 border-surface-low border-t-primaryy rounded-full animate-spin"
      />
    </div>
  );
}