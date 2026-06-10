"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const login = async (data: LoginForm) => {
    setLoading(true);

    try {
      const userData = {
        email: data.email,
        password: data.password,
      };

      const { response } = await loginWithPassword(userData, Boolean(data.remember));

      if (!response.ok) {
        toast.error("Invalid email or password");
        setLoading(false);
        return;
      }

      toast.success("Welcome to taskly");
      router.replace("/");
    } catch {
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
