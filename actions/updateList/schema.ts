import { z } from "zod";

export const updateListSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  id: z.string(),
  boardId: z.string(),
});
