import { z } from "zod";
import { Card } from "@/lib/generated/prisma/client";

import { ActionState } from "@/lib/createSafeAction";
import { updateCardOrderSchema } from "./schema";

export type InputType = z.infer<typeof updateCardOrderSchema>;
export type ReturnType = ActionState<InputType, Card[]>;
