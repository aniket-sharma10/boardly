import { z } from "zod";

export const createBoardSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  image: z.string().min(1, "Image is required"),
});
