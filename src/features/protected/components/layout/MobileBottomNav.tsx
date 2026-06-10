"use client";

import Image from "next/image";
import Link from "next/link";
import { getNavItems } from "../../utils/navItems";

interface MobileBottomNavProps {
  pathname?: string;
  projectId?: string;
}

export const MobileBottomNav = ({
  pathname,
  projectId,
}: MobileBottomNavProps) => {
  const items = getNavItems(projectId);
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#e2e4ed]  md:hidden z-30">
      <div className="flex justify-around items-center py-2 px-2">
        {items.map((item) => {
          const isActive = pathname === item.path;
          let displayName = item.name;
          if (item.name === "Project Epics") displayName = "Epics";
          if (item.name === "Project Tasks") displayName = "Tasks";
          if (item.name === "Project Members") displayName = "Members";
          if (item.name === "Project Details") displayName = "Details";

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-md transition-colors ${
                isActive ? "text-primaryy" : "text-slate-700"
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <Image
                  src={item.icon}
                  width={18}
                  height={18}
                  alt={item.name}
                  className={isActive ? "opacity-100" : "opacity-70"}
                />
              </div>
              <span
                className={`text-[11px] font-medium ${isActive ? "text-primaryy" : "text-slate-700"}`}
              >
                {displayName}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
