"use client";

import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../actions/getCurrentUser";
import type { UserData } from "../types/protected.types";

export const useProtectedLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const fetchUser = async () => {
    try {
      const token = Cookies.get("access_token");

      if (!token) {
        throw new Error("No access token found");
      }

      const { response, result } = await getCurrentUser(token);

      if (!response.ok) {
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

  const handleLogout = () => {
    console.log("Logout clicked");
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
    isMobileMenuOpen,
    loading,
    pathname,
    toggleMobileMenu,
    toggleSidebar,
    user,
  };
};
