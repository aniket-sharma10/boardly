import { z } from "zod";
import { List } from "@/lib/generated/prisma/client";

import { ActionState } from "@/lib/createSafeAction";
import { createListSchema } from "./schema";

export type InputType = z.infer<typeof createListSchema>;
export type ReturnType = ActionState<InputType, List>;
