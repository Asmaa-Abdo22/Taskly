import type { z } from "zod";
import type { forgotPasswordSchema } from "../schemas/forgotPasswordSchema";
import type { loginSchema } from "../schemas/loginSchema";
import type { resetPasswordSchema } from "../schemas/resetPasswordSchema";
import type { signUpSchema } from "../schemas/signUpSchema";

export interface ForgotPasswordPayload {
  email: string;
}

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export type LoginForm = z.infer<typeof loginSchema>;

export type SignUpForm = z.infer<typeof signUpSchema>;

export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
  data: {
    name: string;
    job_title?: string;
  };
}

export interface ResetPasswordPayload {
  password: string;
}
