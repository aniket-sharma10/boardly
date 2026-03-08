import { z } from "zod";
import { List } from "@/lib/generated/prisma/client";

import { ActionState } from "@/lib/createSafeAction";
import { updateListOrderSchema } from "./schema";

export type InputType = z.infer<typeof updateListOrderSchema>;
export type ReturnType = ActionState<InputType, List[]>;
