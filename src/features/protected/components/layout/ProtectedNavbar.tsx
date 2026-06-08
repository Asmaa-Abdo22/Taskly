"use client";

import Image from "next/image";
import burger from "@/src/icons/burger.png";
import icon from "@/src/icons/icon.png";
import type { UserData } from "../../types/protected.types";
import { AvatarDropdown } from "./AvatarDropdown";

interface ProtectedNavbarProps {
  handleLogout: () => void;
  isLoggingOut: boolean;
  loading: boolean;
  toggleMobileMenu: () => void;
  user: UserData | null;
}

export const ProtectedNavbar = ({
  handleLogout,
  isLoggingOut,
  loading,
  toggleMobileMenu,
  user,
}: ProtectedNavbarProps) => (
  <header className=" border-b border-slate-200 px-4 md:px-6 mb-5 pb-3 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <button
        onClick={toggleMobileMenu}
        className="md:hidden p-2 rounded-md hover:bg-surface-low transition-colors"
      >
        <Image src={burger} width={24} height={24} alt="menu" />
      </button>

      <div className="md:hidden flex items-center gap-1">
        <Image src={icon} width={20} height={20} alt="brand icon" />
        <h1 className="text-[18px] text-slate-900 font-bold uppercase">
          taskly
        </h1>
      </div>
    </div>

    <div className="flex items-center gap-3">
      {!loading && user && (
        <>
          <div className="text-right hidden sm:block">
            <p className="text-[14px] font-semibold text-slate-900">
              {user.name}
            </p>
            <p className="text-[10px] font-bold  uppercase text-[#003D9B]">
              {user.jobTitle}
            </p>
          </div>

          <AvatarDropdown
            handleLogout={handleLogout}
            isLoggingOut={isLoggingOut}
            user={user}
          />
        </>
      )}
      {loading && (
        <div className="iconContainer w-10 h-10 bg-slate-300 rounded-full animate-pulse" />
      )}
    </div>
  </header>
);
