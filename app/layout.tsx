import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import RefreshSessionProvider from "@/src/providers/RefreshSession";
import StoreProvider from "@/src/store/provider";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TASKLY - Project Management System",
  description:
    " A modern Project Management System designed to help teams organize, track, and collaborate on work efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <RefreshSessionProvider>{children}</RefreshSessionProvider>
        </StoreProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
