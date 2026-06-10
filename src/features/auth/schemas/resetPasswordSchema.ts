import { z } from "zod";
import { passwordValidation } from "../utils/authValidation";

const resetPasswordBaseSchema = z.object({
  password: z
    .string()
    .min(passwordValidation.minLength, "Password must be at least 8 characters")
    .max(passwordValidation.maxLength, "Password must be at most 64 characters")
    .regex(passwordValidation.noWhitespace, "Password must not contain spaces")
    .regex(passwordValidation.uppercase, "Must contain uppercase letter")
    .regex(passwordValidation.lowercase, "Must contain lowercase letter")
    .regex(passwordValidation.number, "Must contain a number")
    .regex(
      passwordValidation.specialCharacter,
      "Must contain special character",
    ),
  confirmPassword: z.string(),
});

export const resetPasswordSchema = resetPasswordBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  },
);
