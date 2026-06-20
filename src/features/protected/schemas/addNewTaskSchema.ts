import { z } from "zod";

export const addNewTaskSchema = z.object({
  project_id: z.string(),
  epic_id: z.string().max(100, "Max length 100").optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  assignee_id: z.string().optional(),
  due_date: z.string().optional(),
  status: z
    .enum([
      "TO_DO",
      "IN_PROGRESS",
      "BLOCKED",
      "IN_REVIEW",
      "READY_FOR_QA",
      "REOPENED",
      "READY_FOR_PRODUCTION",
      "DONE",
    ])
    .optional(),
});
export type AddNewTaskForm = z.infer<typeof addNewTaskSchema>;
