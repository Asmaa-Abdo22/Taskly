"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("access_token");

    if (token) {
      router.replace("/project");
    } else {
      router.replace("/login");
    }
  }, []);

  return null;
}