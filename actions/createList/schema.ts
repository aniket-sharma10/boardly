import { z } from "zod";

export const createListSchema = z.object({
  title: z.string().min(1, "Title is required"),
  boardId: z.string(),
});
