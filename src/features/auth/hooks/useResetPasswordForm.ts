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
    const searchParams = new URLSearchParams(window.location.search);
    const queryToken = searchParams.get("access_token");

    if (queryToken) {
      setAccessToken(queryToken);
      setLoadingToken(false);
      return;
    }

    const hash = window.location.hash;

    if (hash) {
      const params = new URLSearchParams(hash.slice(1));

      const token = params.get("access_token");
      const type = params.get("type");

      if (token && (!type || type === "recovery")) {
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
      if (!response.ok) {
        toast.error(result?.message || "Failed to update password");
        return;
      }
      if (response.ok) {
        toast.success(
          "Your password has been updated successfully. You can now log in",
        );

        setTimeout(() => {
          router.replace("/login");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred");
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
