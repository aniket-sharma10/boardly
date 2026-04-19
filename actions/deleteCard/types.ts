import { z } from "zod";
import { Card } from "@/lib/generated/prisma/client";

import { ActionState } from "@/lib/createSafeAction";
import { deleteCardSchema } from "./schema";

export type InputType = z.infer<typeof deleteCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
