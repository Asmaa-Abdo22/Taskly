import Link from "next/link";
import EmptyStateProject from "@/src/icons/emptyStateProject.svg";
import PlusIcon from "@/src/icons/plus.svg";
type EmptyStateProps = {
  title: string;
  description: string;
  buttonText: string;
  href?: string;
};

export default function EmptyState({
  title,
  description,
  buttonText,
  href,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col  w-[75%] m-auto items-center py-10 text-center">
      {/* image */}

      <EmptyStateProject width={300} height={300} className="mt-3" />
      <h2 className="mb-3 text-[36px] font-semibold text-slate-900">{title}</h2>

      <p className="mb-10 max-w-md text-slate-500">{description}</p>

      <Link
        href="/project/add"
        className="flex items-center font-semibold text-[16px] btn btn-primaryy "
      >
        <PlusIcon width={24} height={24} className="mt-3" />
        <span> {buttonText}</span>
      </Link>
    </div>
  );
}
