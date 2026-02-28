import { z } from "zod";
import { List } from "@/lib/generated/prisma/client";

import { ActionState } from "@/lib/createSafeAction";
import { updateListSchema } from "./schema";

export type InputType = z.infer<typeof updateListSchema>;
export type ReturnType = ActionState<InputType, List>;
