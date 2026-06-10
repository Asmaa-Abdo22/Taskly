import { z } from "zod";
import { nameRegex, passwordValidation } from "../utils/authValidation";

const signUpBaseSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters")
    .regex(nameRegex, "Invalid name"),
  email: z.string().email("Invalid email format"),
  jobTitle: z.string().optional(),
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

export const signUpSchema = signUpBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  },
);
