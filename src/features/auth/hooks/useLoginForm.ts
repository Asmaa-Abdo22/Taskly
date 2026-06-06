"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { loginWithPassword } from "../api/login";
import { loginSchema } from "../schemas/loginSchema";
import type { LoginForm } from "../types/auth.types";

export const useLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile] = useState(false);
  const router = useRouter();

  const form = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const login = async (data: LoginForm) => {
    setLoading(true);

    try {
      const userData = {
        email: data.email,
        password: data.password,
      };

      const { response, result } = await loginWithPassword(userData);

      if (!response.ok) {
        toast.error("Invalid email or password");
        setLoading(false);
        return;
      }

      const accessToken = result.access_token;
      const refreshToken = result.refresh_token;
      const user = result.user;

      const isRemember = data.remember;

      const cookieOptions = isRemember ? { expires: 30 } : undefined;

      Cookies.set("access_token", accessToken, cookieOptions);
      Cookies.set("refresh_token", refreshToken, cookieOptions);
      Cookies.set("user", JSON.stringify(user), cookieOptions);

      toast.success("Welcome to taskly");

      setTimeout(() => {
        router.push("/project");
      }, 2000);
    } catch (error) {
      toast.error("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    ...form,
    isMobile,
    loading,
    login,
    showPassword,
    setShowPassword,
  };
};
