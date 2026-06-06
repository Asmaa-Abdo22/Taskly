"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updatePassword } from "../api/resetPassword";
import { resetPasswordSchema } from "../schemas/resetPasswordSchema";
import type { ResetPasswordForm } from "../types/auth.types";
import { resetPasswordRules } from "../utils/passwordRules";

export const useResetPasswordForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loadingToken, setLoadingToken] = useState(true);

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = form.watch("password", "");

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const params = new URLSearchParams(hash.slice(1));

      const token = params.get("access_token");

      if (token) {
        setAccessToken(token);
      }
    }

    setLoadingToken(false);
  }, []);

  const createNewPassword = async (data: ResetPasswordForm) => {
    if (!accessToken) {
      toast.error("Invalid or expired reset link");
      return;
    }
    setLoading(true);
    try {
      const userData = {
        password: data.password,
      };

      const { response, result } = await updatePassword(userData, accessToken);
      console.log("base url", process.env.NEXT_PUBLIC_SUPABASE_URL);
      if (!response.ok) {
        toast.error("Failed");
        return;
      }
      if (response.ok) {
        console.log("response", result);
        toast.success(
          "Your password has been updated successfully. You can now log in",
        );

        setTimeout(() => {
          router.replace("/login");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error(" error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    ...form,
    accessToken,
    createNewPassword,
    loading,
    loadingToken,
    password,
    rules: resetPasswordRules,
    setShowPassword,
    showPassword,
    showRules: password.length > 0,
  };
};
