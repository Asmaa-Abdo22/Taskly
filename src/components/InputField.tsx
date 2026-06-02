"use client";
import Image from "next/image";
import noValidate from "@/src/icons/noValidate.png";

interface InputFieldProps {
  label: string;
  id: string;
  placeholder?: string;
  error?: string;
  type?: string;
}

export default function InputField({
  label,
  id,
  placeholder,
  error,
  type = "text",
  ...rest
}: any) {
  return (
    <div className="w-full ">
      <label
        htmlFor={id}
        className="block text-label-sm text-slate-700 uppercase leading-[16.5px] tracking-wide mb-2"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full placeholder:text-[#737685] px-3 py-2 text-body-md text-slate-900 bg-surface-highest border-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-primaryy/50 transition-colors `}
        {...rest}
      />

      {error && error.length === 1 && (
        <p className="text-label-sm text-error mt-1">{error}</p>
      )}

      {error && error.length > 1 && (
        <p className="bg-surface-low text-[#434654] text-[11px] mt-2 flex flex-col gap-1 p-2 rounded">
          {error.split(",").map((err: string, index: number) => (
            <span key={index} className="flex items-center gap-2">
              <Image src={noValidate} alt="" width={12} height={12} />
              {err.trim()}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
