"use server";

import { cookies } from "next/headers";
import {
  AUTH_COOKIE_NAMES,
} from "../constants/session.constants";
import type { AuthSession } from "../types/session.types";
import { getAuthCookieOptions } from "./cookieOptions";

export const getAuthTokens = async () => {
  const cookieStore = await cookies();

  return {
    accessToken: cookieStore.get(AUTH_COOKIE_NAMES.accessToken)?.value,
    refreshToken: cookieStore.get(AUTH_COOKIE_NAMES.refreshToken)?.value,
  };
};

export const setAuthCookies = async (session: AuthSession) => {
  const cookieStore = await cookies();
  const options = getAuthCookieOptions();

  cookieStore.set(AUTH_COOKIE_NAMES.accessToken, session.accessToken, options);
  cookieStore.set(AUTH_COOKIE_NAMES.refreshToken, session.refreshToken, options);
};

export const clearAuthCookies = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(AUTH_COOKIE_NAMES.accessToken);
  cookieStore.delete(AUTH_COOKIE_NAMES.refreshToken);
  cookieStore.delete("user");
};
