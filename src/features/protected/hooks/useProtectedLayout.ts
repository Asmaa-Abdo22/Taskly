"use client";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { logoutUser } from "../../auth/api/logout";
import { clearUser, setUser as setAuthUser } from "../../auth/store/authSlice";
import type { UserData } from "../types/protected.types";

const clearStoredAuthData = () => {
  ["access_token", "refresh_token", "user"].forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
};

const getProjectIdFromPathname = (pathname: string) => {
  const match = pathname.match(/^\/project\/([^/]+)\/(epics|tasks|members|edit)$/);

  return match?.[1];
};

export const useProtectedLayout = (initialUser: UserData) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();
  const projectId = getProjectIdFromPathname(pathname);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user) ?? initialUser;

  useEffect(() => {
    dispatch(setAuthUser(initialUser));
  }, [dispatch, initialUser]);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const { response } = await logoutUser();

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      clearStoredAuthData();
      dispatch(clearUser());

      toast.success("Logged out");
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed, please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return {
    closeMobileMenu,
    handleLogout,
    isCollapsed,
    isLoggingOut,
    isMobileMenuOpen,
    loading: false,
    pathname,
    projectId,
    toggleMobileMenu,
    toggleSidebar,
    user,
  };
};
