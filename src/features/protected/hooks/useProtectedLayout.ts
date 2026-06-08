"use client";

import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { logoutUser } from "../../auth/api/logout";
import { getCurrentUser } from "../actions/getCurrentUser";
import type { UserData } from "../types/protected.types";

const clearStoredAuthData = () => {
  ["access_token", "refresh_token", "user"].forEach((key) => {
    Cookies.remove(key);
    Cookies.remove(key, { path: "/" });
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
};

export const useProtectedLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const token = Cookies.get("access_token");

      if (!token) {
        throw new Error("No access token found");
      }

      const { response, result } = await getCurrentUser(token);

      if (!response.ok) {
        toast.error("Failed to get user")
        throw new Error(result?.message || "Failed to fetch user");
        
      }

      return result;
    } catch (error) {
      console.error("FETCH USER ERROR:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);

      const user = await fetchUser();
      console.log("RESPONSE:", user);
      if (!user) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser({
        name: user.user_metadata?.name ?? "No Name",
        jobTitle: user.user_metadata?.job_title ?? "No Title",
      });

      setLoading(false);
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const token = Cookies.get("access_token");

      if (!token) {
        clearStoredAuthData();
        router.replace("/login");
        return;
      }

      const { response } = await logoutUser(token);

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      clearStoredAuthData();
      setUser(null);

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
    loading,
    pathname,
    toggleMobileMenu,
    toggleSidebar,
    user,
  };
};
