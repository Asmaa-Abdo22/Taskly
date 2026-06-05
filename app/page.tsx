"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

    const token = Cookies.get("access_token");

    if (token) {
      router.replace("/project");
    } else {
      router.replace("/login");
    }
  }, []);

  return null;
}
