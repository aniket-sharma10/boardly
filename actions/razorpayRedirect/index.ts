"use server";

import { auth, currentUser } from "@clerk/nextjs/server";

import { ReturnType } from "./types";
import { createSafeAction } from "@/lib/createSafeAction";
import { razorpayRedirectSchema } from "./schema";
import { razorpay } from "@/lib/razorpay";
import { getSubscription } from "@/lib/subscription";

const handler = async (): Promise<ReturnType> => {
  const { userId, orgId } = await auth();
  const user = await currentUser();

  if (!userId || !orgId || !user) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    const activeSubscription = await getSubscription();

    if (activeSubscription) {
      return {
        error: "Your account already has an active Pro subscription.",
      };
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID!,
      total_count: 12,
      customer_notify: 1,
      notes: {
        orgId,
        userId,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return {
      data: subscription.id,
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Something went wrong!",
    };
  }
};

export const razorpayRedirect = createSafeAction(
  razorpayRedirectSchema,
  handler,
);
