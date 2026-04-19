import { z } from "zod";
import { Card } from "@/lib/generated/prisma/client";

import { ActionState } from "@/lib/createSafeAction";
import { copyCardSchema } from "./schema";

export type InputType = z.infer<typeof copyCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
