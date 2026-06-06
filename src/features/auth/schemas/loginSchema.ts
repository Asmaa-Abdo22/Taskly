import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email cannot be empty")
    .email("Email format must be valid"),

  password: z.string().min(1, "Password cannot be empty"),
  remember: z.boolean().optional(),
});
