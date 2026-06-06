"use client";

import { useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { refreshSession as refreshSessionAction } from "@/src/features/auth/api/refreshSession";

const RefreshSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const refreshSession = useCallback(async () => {
    const refreshToken = Cookies.get("refresh_token");

    if (!refreshToken) return;

    const { response, data } = await refreshSessionAction(refreshToken);

    if (response.ok) {
      Cookies.set("access_token", data.access_token);
      Cookies.set("refresh_token", data.refresh_token);
    } else {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get("access_token");

    if (token) {
      refreshSession();
    }
  }, [refreshSession]);

  return <>{children}</>;
};

export default RefreshSessionProvider;
