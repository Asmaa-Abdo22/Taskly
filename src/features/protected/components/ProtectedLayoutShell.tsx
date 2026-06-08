"use client";

import { useProtectedLayout } from "../hooks/useProtectedLayout";
import type { UserData } from "../types/protected.types";
import { DesktopSidebar } from "./layout/DesktopSidebar";
import { MobileBottomNav } from "./layout/MobileBottomNav";
import { MobileSidebar } from "./layout/MobileSidebar";
import { ProtectedNavbar } from "./layout/ProtectedNavbar";

export default function ProtectedLayoutShell({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: UserData;
}) {
  const {
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
  } = useProtectedLayout(initialUser);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9FF]">
      <div className="flex flex-1">
        <DesktopSidebar
          handleLogout={handleLogout}
          isCollapsed={isCollapsed}
          isLoggingOut={isLoggingOut}
          pathname={pathname}
          toggleSidebar={toggleSidebar}
        />
        <MobileSidebar
          closeMobileMenu={closeMobileMenu}
          handleLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          isMobileMenuOpen={isMobileMenuOpen}
          pathname={pathname}
        />
        <main className="flex-1  p-4 md:p-6 pb-20 md:pb-6 overflow-auto">
          <ProtectedNavbar
            handleLogout={handleLogout}
            isLoggingOut={isLoggingOut}
            loading={loading}
            toggleMobileMenu={toggleMobileMenu}
            user={user}
          />
          {children}
        </main>
      </div>
      {!isMobileMenuOpen && <MobileBottomNav pathname={pathname} />}
    </div>
  );
}
