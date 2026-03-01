import { z } from "zod";
import { List } from "@/lib/generated/prisma/client";

import { ActionState } from "@/lib/createSafeAction";
import { copyListSchema } from "./schema";

export type InputType = z.infer<typeof copyListSchema>;
export type ReturnType = ActionState<InputType, List>;
