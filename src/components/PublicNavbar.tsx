import Image from "next/image";
import Link from "next/link";
import icon from "@/src/icons/icon.png";

export default function PublicNavbar() {
  return (
    <nav className="h-20 flex items-center mb-2 md:mb-10 px-5 md:px-14 ">
      <Link href="/" className="flex gap-2 items-center">
        <Image src={icon} alt="Taskly" width={19} height={19} />
        <h1 className=" uppercase text-[20px] text-slate-900 font-bold">
          taskly
        </h1>
      </Link>
    </nav>
  );
}
