export default function EpicSkeleton() {
  return (
    <div className="w-full animate-pulse p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex gap-3 mb-5">
          <div className="h-3 w-12 rounded bg-[#EEF2FF]" />
          <div className="h-3 w-16 rounded bg-[#EEF2FF]" />
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="h-10 w-40 rounded bg-[#EEF2FF]" />

          <div className="flex gap-3">
            <div className="h-10 w-24 rounded bg-[#EEF2FF]" />
            <div className="h-10 w-32 rounded bg-[#EEF2FF]" />
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="
              bg-white
            
              rounded-lg
              p-4
              shadow
            "
          >
            {/* Card Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="h-3 w-14 rounded bg-[#EEF2FF]" />

              <div className="h-8 w-8 rounded-full bg-[#EEF2FF]" />
            </div>

            {/* Title */}
            <div className="h-4 w-full rounded bg-[#EEF2FF] mb-6" />

            {/* User */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-full bg-[#EEF2FF]" />

              <div className="h-3 w-24 rounded bg-[#EEF2FF]" />
            </div>

            {/* Divider */}
            <div className="border-t border-[#F1F5F9] pt-3">
              <div className="flex items-center justify-between">
                <div className="h-3 w-10 rounded bg-[#EEF2FF]" />
                <div className="h-3 w-10 rounded bg-[#EEF2FF]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
