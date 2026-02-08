import { z } from "zod";
import { Board } from "@/lib/generated/prisma/client";

import { ActionState } from "@/lib/createSafeAction";
import { createBoardSchema } from "./schema";

export type InputType = z.infer<typeof createBoardSchema>;
export type ReturnType = ActionState<InputType, Board>;
