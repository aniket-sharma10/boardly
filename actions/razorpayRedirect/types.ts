import { z } from "zod";

import { ActionState } from "@/lib/createSafeAction";
import { razorpayRedirectSchema } from "./schema";

export type InputType = z.infer<typeof razorpayRedirectSchema>;
export type ReturnType = ActionState<InputType, string>;
