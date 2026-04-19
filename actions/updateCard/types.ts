import { z } from "zod";
import { Card } from "@/lib/generated/prisma/client";

import { ActionState } from "@/lib/createSafeAction";
import { updateCardSchema } from "./schema";

export type InputType = z.infer<typeof updateCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
