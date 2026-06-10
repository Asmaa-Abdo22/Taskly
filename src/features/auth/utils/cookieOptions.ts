import { SESSION_MAX_AGE_SECONDS } from "../constants/session.constants";

export const getAuthCookieOptions = (persistent = false) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };

  return persistent
    ? {
        ...options,
        maxAge: SESSION_MAX_AGE_SECONDS,
      }
    : options;
};
