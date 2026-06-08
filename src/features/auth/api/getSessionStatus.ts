"use server";

import { getAuthTokens } from "../utils/sessionCookies";

export const getSessionStatus = async () => {
  const { accessToken, refreshToken } = await getAuthTokens();

  return {
    authenticated: Boolean(accessToken || refreshToken),
  };
};
