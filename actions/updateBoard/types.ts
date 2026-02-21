import { z } from "zod";
import { Board } from "@/lib/generated/prisma/client";

import { ActionState } from "@/lib/createSafeAction";
import { updateBoardSchema } from "./schema";

export type InputType = z.infer<typeof updateBoardSchema>;
export type ReturnType = ActionState<InputType, Board>;
