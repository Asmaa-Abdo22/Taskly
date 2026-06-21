"use client";

import Image from "next/image";
import Link from "next/link";
import collapse from "@/src/icons/collapse.png";
import icon from "@/src/icons/icon.png";
import logout from "@/src/icons/logout.png";
import { getNavItems } from "../../utils/navItems";

interface DesktopSidebarProps {
  projectId?: string;
  handleLogout: () => void;
  isCollapsed: boolean;
  isLoggingOut: boolean;
  pathname?: string;
  toggleSidebar: () => void;
}

export const DesktopSidebar = ({
  projectId,
  handleLogout,
  isCollapsed,
  isLoggingOut,
  pathname,
  toggleSidebar,
}: DesktopSidebarProps) => {
  const items = getNavItems(projectId);
return <>
 <aside
    className={`hidden md:flex flex-col justify-between min-h-screen bg-[#C3C6D633] transition-all duration-300 ease-in-out ${
      isCollapsed ? "w-18" : "w-65"
    }`}
  >
    <div className="flex flex-col">
      <div
        className={`px-4 pt-6 pb-8 flex items-center gap-2 ${isCollapsed ? "justify-center" : ""}`}
      >
        <Image src={icon} width={23} height={23} alt="brand icon" />

        {!isCollapsed && (
          <h1 className=" uppercase text-headline-lg text-slate-900 font-bold">
            taskly
          </h1>
        )}
      </div>

      <nav className="flex-1">
        <ul className="space-y-1 px-2">
          {items.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`flex  items-center gap-1 px-3 py-1 rounded-md transition-colors  ${
                    isActive
                      ? "bg-white text-primaryy"
                      : "text-slate-700 hover:bg-white hover:text-blue-800"
                  } ${isCollapsed ? "justify-center" : ""}`}
                >
                  <div className="w-10 h-10 rounded-xs    flex items-center justify-center">
                    <Image
                      src={item.icon}
                      width={18}
                      height={18}
                      alt={item.name}
                      className={isActive ? "bg-background " : ""}
                    />
                  </div>
                  {!isCollapsed && (
                    <span className="text-body-md font-semibold">
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>

    <div className="pb-6 px-2 flex flex-col">
      <button
        onClick={toggleSidebar}
        className={`cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md w-full text-slate-700 hover:bg-surface-low transition-colors ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        <div className="  flex items-center justify-center">
          <Image src={collapse} width={12} height={12} alt="collapse" />
        </div>
        {!isCollapsed && (
          <span className="text-body-md font-medium">Collapse</span>
        )}
      </button>
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md w-full text-[#BA1A1A] hover:bg-surface-low transition-colors ${
          isCollapsed ? "justify-center" : ""
        } disabled:cursor-not-allowed disabled:opacity-60`}
      >
        <div className="  flex items-center justify-center">
          <Image src={logout} width={15} height={15} alt="collapse" />
        </div>
        {!isCollapsed && (
          <span className="text-body-md font-medium">Logout</span>
        )}
      </button>
    </div>
  </aside>
</>
}
