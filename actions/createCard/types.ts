import { z } from "zod";
import { Card } from "@/lib/generated/prisma/client";

import { ActionState } from "@/lib/createSafeAction";
import { createCardSchema } from "./schema";

export type InputType = z.infer<typeof createCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
