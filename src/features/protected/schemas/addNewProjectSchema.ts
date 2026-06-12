import { z } from "zod";
export const addNewProjectSchema = z.object({
  name: z
    .string()
    .min(3, " Name must be at least 3 characters.")
    .max(100, " Max length 100"),
  description: z.string().max(500, "Max length 500").optional(),
});
