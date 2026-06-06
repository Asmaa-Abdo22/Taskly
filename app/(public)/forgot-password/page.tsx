"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordForm,
  forgotPasswordSchema,
} from "@/src/features/auth/schemas/forgotPasswordSchema";
import { sendResetLink } from "@/src/features/auth/api/forgotPassword";
import ForgotPasswordFormView from "@/src/features/auth/components/ForgotPasswordFormView";

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [savedEmail, setSavedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
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
      setSeconds(300);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResend = async () => {
    if (seconds > 0 || resendCount >= 3 || !savedEmail) return;

    try {
      await sendResetLink(savedEmail);

      setResendCount((prev) => prev + 1);
      setSeconds(300);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ForgotPasswordFormView
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
      success={success}
      seconds={seconds}
      resendCount={resendCount}
      onSubmit={onSubmit}
      handleResend={handleResend}
    />
  );
}
