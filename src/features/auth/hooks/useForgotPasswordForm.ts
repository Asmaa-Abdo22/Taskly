"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { sendResetLink } from "../api/forgotPassword";
import { MAX_RESEND_ATTEMPTS, RESET_LINK_TIMEOUT } from "../constants/auth.constants";
import { forgotPasswordSchema } from "../schemas/forgotPasswordSchema";
import type { ForgotPasswordForm } from "../types/auth.types";

export const useForgotPasswordForm = () => {
  const [success, setSuccess] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [resending, setResending] = useState(false);
  const [savedEmail, setSavedEmail] = useState("");

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (!success || seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [success, seconds]);

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      await sendResetLink(data.email);

      setSavedEmail(data.email);
      setSuccess(true);
      setSeconds(RESET_LINK_TIMEOUT);
      setResendCount(0);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send reset link");
    }
  };

  const handleResend = async () => {
    if (seconds > 0 || resendCount >= MAX_RESEND_ATTEMPTS || !savedEmail) {
      return;
    }

    setResending(true);

    try {
      await sendResetLink(savedEmail);

      setResendCount((prev) => prev + 1);
      setSeconds(RESET_LINK_TIMEOUT);
    } catch (error) {
      console.error(error);
      toast.error("Failed to resend reset link");
    } finally {
      setResending(false);
    }
  };

  return {
    ...form,
    handleResend,
    onSubmit,
    resendCount,
    resending,
    seconds,
    success,
  };
};
