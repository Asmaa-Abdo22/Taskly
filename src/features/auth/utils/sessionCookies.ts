"use server";

import { cookies } from "next/headers";
import { AUTH_COOKIE_NAMES } from "../constants/session.constants";
import type { AuthSession } from "../types/session.types";
import { getAuthCookieOptions } from "./cookieOptions";

export const getAuthTokens = async () => {
  const cookieStore = await cookies();

  return {
    accessToken: cookieStore.get(AUTH_COOKIE_NAMES.accessToken)?.value,
    refreshToken: cookieStore.get(AUTH_COOKIE_NAMES.refreshToken)?.value,
    rememberSession:
      cookieStore.get(AUTH_COOKIE_NAMES.rememberSession)?.value === "true",
  };
};

export const setAuthCookies = async (
  session: AuthSession,
  persistent = false,
) => {
  const cookieStore = await cookies();
  const options = getAuthCookieOptions(persistent);

  cookieStore.set(AUTH_COOKIE_NAMES.accessToken, session.accessToken, options);
  cookieStore.set(AUTH_COOKIE_NAMES.refreshToken, session.refreshToken, options);

  if (persistent) {
    cookieStore.set(
      AUTH_COOKIE_NAMES.rememberSession,
      "true",
      getAuthCookieOptions(true),
    );
  } else {
    cookieStore.delete(AUTH_COOKIE_NAMES.rememberSession);
  }
};

export const clearAuthCookies = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(AUTH_COOKIE_NAMES.accessToken);
  cookieStore.delete(AUTH_COOKIE_NAMES.refreshToken);
  cookieStore.delete(AUTH_COOKIE_NAMES.rememberSession);
  cookieStore.delete("user");
};
