"use client";

import Image from "next/image";
import { useState } from "react";
import logout from "@/src/icons/logout.png";
import type { UserData } from "../../types/protected.types";
import { getAvatarInitials } from "../../utils/getAvatarInitials";

interface AvatarDropdownProps {
  handleLogout: () => void;
  isLoggingOut: boolean;
  user: UserData;
}

export const AvatarDropdown = ({
  handleLogout,
  isLoggingOut,
  user,
}: AvatarDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className=" w-9 h-9 p-2 bg-[#0052CC] rounded-xl flex items-center justify-center cursor-pointer"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="text-white p-3 text-[16px] font-semibold">
          {getAvatarInitials(user?.name || "")}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-50">
          <button
            onClick={() => {
              setOpen(false);
              handleLogout();
            }}
            disabled={isLoggingOut}
            className="w-full cursor-pointer text-left px-4 py-2 text-sm text-[#BA1A1A] hover:bg-surface-low disabled:cursor-not-allowed disabled:opacity-60"
          >
            <div className="flex gap-2">
              <Image src={logout} width={15} height={15} alt="collapse" />
              <span className="text-body-md font-medium">Logout</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
