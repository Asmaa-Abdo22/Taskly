export const AUTH_COOKIE_NAMES = {
  accessToken: "access_token",
  refreshToken: "refresh_token",
  rememberSession: "remember_session",
} as const;

export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
