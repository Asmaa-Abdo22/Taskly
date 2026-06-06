import { z } from "zod";
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email cannot be empty")
    .email("Email format must be valid"),
});
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
