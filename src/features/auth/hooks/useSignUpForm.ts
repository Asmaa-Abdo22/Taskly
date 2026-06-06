"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signUpWithEmail } from "../api/signUp";
import { signUpSchema } from "../schemas/signUpSchema";
import type { SignUpForm } from "../types/auth.types";
import { signUpPasswordRules } from "../utils/passwordRules";

export const useSignUpForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SignUpForm>({ resolver: zodResolver(signUpSchema) });

  const password = form.watch("password", "");

  const signUp = async (data: SignUpForm) => {
    setLoading(true);
    try {
      const userData = {
        email: data.email,
        password: data.password,
        data: {
          name: data.name,
          job_title: data.jobTitle,
        },
      };

      const { response, result } = await signUpWithEmail(userData);
      if (!response.ok) {
        toast.error(result.msg || "Failed to create account");
        return;
      }
      if (response.ok) {
        console.log("response", result);
        toast.success("Account created successfully!");

        setTimeout(() => {
          router.replace("/project");
        }, 2500);
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
    loading,
    password,
    rules: signUpPasswordRules,
    showConfirmPassword,
    showPassword,
    showRules: password.length > 0,
    signUp,
    setShowConfirmPassword,
    setShowPassword,
  };
};
