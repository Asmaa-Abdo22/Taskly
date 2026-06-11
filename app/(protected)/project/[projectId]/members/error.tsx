"use client";
import ErrorProject from "@/src/icons/errorProject.svg";
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[80%]">
      <div className="flex flex-col  w-[75%] m-auto items-center py-10 text-center">
        {/* image */}

        <div className=" bg-[#FFDAD6] w-fit  my-3 p-3 rounded-md flex  items-center justify-center">
          <ErrorProject width={25} height={25} className=" text-error" />
        </div>

        <h2 className="mb-3 text-[20px] font-semibold text-slate-900">
          Something went wrong
        </h2>

        <p className="mb-10 max-w-md text-[16px] text-slate-500">
          {error.message}
        </p>

        <button onClick={() => reset()} className="flex items-center font-semibold text-[16px] btn btn-primaryy ">
          <span >Retry Connection</span>
        </button>
      </div>
    </div>
  );
}
