import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAMES } from "./src/features/auth/constants/session.constants";
import { getAuthCookieOptions } from "./src/features/auth/utils/cookieOptions";

const PUBLIC_PATHS = [
  "/login",
  "/sign-up",
  "/",
  "/forgot-password",
  "/reset-password",
];

const PROTECTED_PATHS = ["/project", "/epics", "/tasks", "/members", "/edit"];

const isPublicPath = (pathname: string) =>
  PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(path + "/"));

const redirectToLogin = (req: NextRequest) => {
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("from", req.nextUrl.pathname);
  const response = NextResponse.redirect(loginUrl);

  response.cookies.delete(AUTH_COOKIE_NAMES.accessToken);
  response.cookies.delete(AUTH_COOKIE_NAMES.refreshToken);
  response.cookies.delete(AUTH_COOKIE_NAMES.rememberSession);
  response.cookies.delete("user");

  return response;
};

const verifyAccessToken = async (accessToken: string) => {
  const response = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
    method: "GET",
    headers: {
      apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.ok;
};

const refreshAccessToken = async (refreshToken: string) => {
  const response = await fetch(
    `${process.env.SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    },
  );

  if (!response.ok) {
    return null;
  }

  let data = null;

  try {
    data = await response.json();
  } catch {
    return null;
  }

  if (!data.access_token || !data.refresh_token) {
    return null;
  }

  return {
    accessToken: data.access_token as string,
    refreshToken: data.refresh_token as string,
  };
};

const getForwardedCookieHeader = (
  req: NextRequest,
  session: { accessToken: string; refreshToken: string },
) => {
  const cookies = req.cookies
    .getAll()
    .map(({ name, value }) => [name, value] as const);
  const cookieMap = new Map(cookies);

  cookieMap.set(AUTH_COOKIE_NAMES.accessToken, session.accessToken);
  cookieMap.set(AUTH_COOKIE_NAMES.refreshToken, session.refreshToken);
  cookieMap.delete("user");

  return Array.from(cookieMap.entries())
    .map(([name, value]) => `${name}=${value}`)
    .join("; ");
};

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const isProtectedPath = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + "/"),
  );

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;
  const refreshToken = req.cookies.get(AUTH_COOKIE_NAMES.refreshToken)?.value;

  if (accessToken && (await verifyAccessToken(accessToken))) {
    return NextResponse.next();
  }

  if (!refreshToken) {
    return redirectToLogin(req);
  }

  const refreshedSession = await refreshAccessToken(refreshToken);

  if (!refreshedSession) {
    return redirectToLogin(req);
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("cookie", getForwardedCookieHeader(req, refreshedSession));

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  const cookieOptions = getAuthCookieOptions(
    req.cookies.get(AUTH_COOKIE_NAMES.rememberSession)?.value === "true",
  );

  response.cookies.set(
    AUTH_COOKIE_NAMES.accessToken,
    refreshedSession.accessToken,
    cookieOptions,
  );
  response.cookies.set(
    AUTH_COOKIE_NAMES.refreshToken,
    refreshedSession.refreshToken,
    cookieOptions,
  );
  response.cookies.delete("user");

  return response;
}

export const config = {
  matcher: [
    "/project/:path*",
    "/epics/:path*",
    "/tasks/:path*",
    "/members/:path*",
    "/details/:path*",
  ],
};
