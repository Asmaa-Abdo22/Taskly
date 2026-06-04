"use client";

import { useEffect, useCallback } from "react";
import Cookies from "js-cookie";

const RefreshSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const refreshSession = useCallback(async () => {
    const refreshToken = Cookies.get("refresh_token");

    if (!refreshToken) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
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