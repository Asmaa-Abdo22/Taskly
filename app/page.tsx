"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getSessionStatus } from "@/src/features/auth/api/getSessionStatus";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";

    if (hash) {
      const params = new URLSearchParams(hash.slice(1));
      const token = params.get("access_token");
      const type = params.get("type");

      if (type === "recovery" && token) {
        // keep the hash when navigating so reset-password can read it
        router.replace(`/reset-password${hash}`);
        return;
      }
    }

    getSessionStatus()
      .then(({ authenticated }) => {
        router.replace(authenticated ? "/project" : "/login");
      })
      .catch(() => {
        router.replace("/login");
      });
  }, [router]);

  return null;
}
