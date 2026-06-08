"use client";

import Image from "next/image";
import Link from "next/link";
import icon from "@/src/icons/icon.png";
import logout from "@/src/icons/logout.png";
import { navItems } from "../../utils/navItems";

interface MobileSidebarProps {
  closeMobileMenu: () => void;
  handleLogout: () => void;
  isLoggingOut: boolean;
  isMobileMenuOpen: boolean;
  pathname: string;
}

export const MobileSidebar = ({
  closeMobileMenu,
  handleLogout,
  isLoggingOut,
  isMobileMenuOpen,
  pathname,
}: MobileSidebarProps) => (
  <>
    {isMobileMenuOpen && (
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={closeMobileMenu}
      />
    )}

    <aside
      className={`fixed top-0 left-0 h-full w-70 bg-background z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="px-6 pt-6 pb-5 flex items-center gap-2">
          <Image src={icon} width={23} height={23} alt="brand icon" />
          <h1 className="text-[20px] text-slate-900 font-bold">TASKLY</h1>
        </div>

        <nav className="flex-1">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-1 px-3 py-1 rounded-md transition-colors ${
                      isActive
                        ? "bg-background "
                        : "text-slate-700 hover:bg-background hover:text-primaryy"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xs flex items-center justify-center">
                      <Image
                        src={item.icon}
                        width={18}
                        height={18}
                        alt={item.name}
                      />
                    </div>

                    <span
                      className={`text-body-md font-medium ${
                        isActive ? "text-[#0052CC]" : "text-slate-700"
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="pb-6 px-2 flex flex-col mt-2">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="cursor-pointer flex items-center gap-1 px-3 py-1 rounded-md w-full text-[#BA1A1A] hover:bg-background transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            <div className="w-10 h-10 rounded-xs flex items-center justify-center">
              <Image src={logout} width={15} height={15} alt="logout" />
            </div>

            <span className="text-body-md font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  </>
);
