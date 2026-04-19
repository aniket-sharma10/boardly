import { z } from "zod";

export const updateCardSchema = z.object({
  boardId: z.string(),
  description: z.string().min(3, "Description must be at least 3 characters long").optional(),
  title: z.string().min(3, "Title must be at least 3 characters long"),
  id: z.string(),
});
