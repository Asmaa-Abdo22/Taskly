"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getValidRecoverySession,
  updatePassword,
  type RecoverySession,
} from "../api/resetPassword";
import { resetPasswordSchema } from "../schemas/resetPasswordSchema";
import type { ResetPasswordForm } from "../types/auth.types";
import { resetPasswordRules } from "../utils/passwordRules";

const RECOVERY_SESSION_STORAGE_KEY = "taskly_recovery_session";

const getStoredRecoverySession = (): RecoverySession | null => {
  const storedSession = window.sessionStorage.getItem(
    RECOVERY_SESSION_STORAGE_KEY,
  );

  if (!storedSession) {
    return null;
  }

  try {
    const session = JSON.parse(storedSession) as Partial<RecoverySession>;

    if (session.accessToken && session.refreshToken) {
      return {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      };
    }
  } catch {
    window.sessionStorage.removeItem(RECOVERY_SESSION_STORAGE_KEY);
  }

  return null;
};

const storeRecoverySession = (session: RecoverySession) => {
  window.sessionStorage.setItem(
    RECOVERY_SESSION_STORAGE_KEY,
    JSON.stringify(session),
  );
};

const clearRecoverySession = () => {
  window.sessionStorage.removeItem(RECOVERY_SESSION_STORAGE_KEY);
};

const getRecoverySessionFromHash = (): RecoverySession | null => {
  const params = new URLSearchParams(window.location.hash.slice(1));
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");
  const type = params.get("type");

  if (type !== "recovery" || !accessToken || !refreshToken) {
    return null;
  }

  return {
    accessToken,
    refreshToken,
  };
};

export const useResetPasswordForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loadingToken, setLoadingToken] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password", "");

  useEffect(() => {
    let mounted = true;

    const loadRecoverySession = async () => {
      const hashSession = getRecoverySessionFromHash();
      const recoverySession = hashSession || getStoredRecoverySession();

      if (hashSession) {
        storeRecoverySession(hashSession);
        window.history.replaceState(null, "", window.location.pathname);
      }

      if (!recoverySession) {
        clearRecoverySession();
        if (mounted) {
          setAccessToken(null);
          setLoadingToken(false);
        }
        return;
      }

      const { response, session } =
        await getValidRecoverySession(recoverySession);

      if (!mounted) {
        return;
      }

      if (!response.ok || !session) {
        clearRecoverySession();
        setAccessToken(null);
        setLoadingToken(false);
        return;
      }

      storeRecoverySession(session);
      setAccessToken(session.accessToken);
      setLoadingToken(false);
    };

    loadRecoverySession().catch(() => {
      clearRecoverySession();
      if (mounted) {
        setAccessToken(null);
        setLoadingToken(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const createNewPassword = async (data: ResetPasswordForm) => {
    if (!accessToken) {
      toast.error("Invalid or expired reset link.");
      return;
    }
    setLoading(true);
    try {
      const userData = {
        password: data.password,
      };

      const recoverySession = getStoredRecoverySession();
      const validSession = recoverySession
        ? await getValidRecoverySession(recoverySession)
        : null;
      const currentAccessToken =
        validSession?.response.ok && validSession.session
          ? validSession.session.accessToken
          : accessToken;

      if (validSession?.session) {
        storeRecoverySession(validSession.session);
        setAccessToken(validSession.session.accessToken);
      }

      const { response, result } = await updatePassword({
        accessToken: currentAccessToken,
        password: userData.password,
      });
      if (!response.ok) {
        toast.error(result?.message || "Failed to update password");
        return;
      }
      if (response.ok) {
        const message =
          "Your password has been updated successfully. You can now log in";

        setSuccessMessage(message);
        toast.success(message);
        clearRecoverySession();

        setTimeout(() => {
          router.replace("/login");
        }, 3000);
      }
    } catch {
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
    successMessage,
  };
};
