import { z } from "zod";
import { List } from "@/lib/generated/prisma/client";

import { ActionState } from "@/lib/createSafeAction";
import { deleteListSchema } from "./schema";

export type InputType = z.infer<typeof deleteListSchema>;
export type ReturnType = ActionState<InputType, List>;
