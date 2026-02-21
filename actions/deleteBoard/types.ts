import { z } from "zod";
import { Board } from "@/lib/generated/prisma/client";

import { ActionState } from "@/lib/createSafeAction";
import { deleteBoardSchema } from "./schema";

export type InputType = z.infer<typeof deleteBoardSchema>;
export type ReturnType = ActionState<InputType, Board>;
