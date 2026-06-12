import { z } from "zod";
export const addNewEpicSchema = z.object({
  title: z.string().trim().min(3, "Title is required (minimum 3 characters)"),
  description: z.string().max(500, "Max length 500").optional(),
  assignee_id: z.string().optional(),
  deadline: z
    .string()
    .optional()
    .refine(
      (date) => {
        if (!date) return true;

        const today = new Date().toLocaleDateString("en-CA");

        return date >= today;
      },
      {
        message: "Deadline must be today or in the future",
      },
    ),
});
