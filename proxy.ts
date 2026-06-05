import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const PUBLIC_PATHS = [
    "/login",
    "/sign-up",
    "/",
    "/forgot-password",
    "/reset-password",
  ];

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("access_token")?.value;

  if (!accessToken) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/project/:path*"],
};