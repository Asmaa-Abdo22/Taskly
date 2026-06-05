"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import tasks from "@/src/icons/tasks.png";
import details from "@/src/icons/details.png";
import epic from "@/src/icons/epic.png";
import projects from "@/src/icons/projects.png";
import members from "@/src/icons/members.png";
import collapse from "@/src/icons/collapse.png";
import logout from "@/src/icons/logout.png";
import burger from "@/src/icons/burger.png";
import icon from "@/src/icons/icon.png";
import Link from "next/link";
import Cookies from "js-cookie";

interface UserData {
  name: string;
  jobTitle: string;
}

const navItems = [
  { name: "Projects", icon: projects, path: "/project" },
  { name: "Project Epics", icon: epic, path: "/epics" },
  { name: "Project Tasks", icon: tasks, path: "/tasks" },
  { name: "Project Members", icon: members, path: "/members" },
  { name: "Project Details", icon: details, path: "/details" },
];

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`,
        {
          method: "GET",
          headers: {
            apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.json();

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

  const getAvatarInitials = (name: string) => {
    if (!name) return "??";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

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

  // Desktop Sidebar Component
  const DesktopSidebar = () => (
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
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`flex  items-center gap-1 px-3 py-1 rounded-md transition-colors ${
                      isActive
                        ? "bg-background text-primaryy"
                        : "text-slate-700 hover:bg-background hover:text-primaryy"
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
          className={`cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md w-full text-[#BA1A1A] hover:bg-surface-low transition-colors ${
            isCollapsed ? "justify-center" : ""
          }`}
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
  );

  const MobileBottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-background  md:hidden z-30">
      <div className="flex justify-around items-center py-2 px-2">
        {navItems.map((item) => {
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

  // Mobile Sidebar (Drawer)
  const MobileSidebar = () => (
    <>
      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Drawer */}
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
              className="cursor-pointer flex items-center gap-1 px-3 py-1 rounded-md w-full text-[#BA1A1A] hover:bg-background transition-colors"
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

  // Navbar Component
  const Navbar = () => (
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
            <div className=" w-9 h-9 p-2 bg-[#0052CC] rounded-xl flex items-center justify-center">
              <span className="text-white p-3 text-[16px] font-semibold">
                {getAvatarInitials(user.name)}
              </span>
            </div>
          </>
        )}
        {loading && (
          <div className="iconContainer w-10 h-10 bg-slate-300 rounded-full animate-pulse" />
        )}
      </div>
    </header>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9FF]">
      <div className="flex flex-1">
        <DesktopSidebar />
        <MobileSidebar />
        <main className="flex-1  p-4 md:p-6 pb-20 md:pb-6 overflow-auto">
          <Navbar />
          {children}
        </main>
      </div>
      {!isMobileMenuOpen && <MobileBottomNav />}
    </div>
  );
}
