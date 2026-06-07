"use server";

import { auth, currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { ReturnType } from "./types";
import { createSafeAction } from "@/lib/createSafeAction";
import { razorpayRedirectSchema } from "./schema";
import { razorpay } from "@/lib/razorpay";

const handler = async (): Promise<ReturnType> => {
  const { userId, orgId } = await auth();
  const user = await currentUser();

  if (!userId || !orgId || !user) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId,
      },
    });

    const isSubscribed =
      orgSubscription?.razorpayCurrentPeriodEnd &&
      orgSubscription.razorpayCurrentPeriodEnd > new Date();

    if (isSubscribed) {
      return {
        error: "Organization is already subscribed.",
      };
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID!,
      total_count: 12,
      customer_notify: 1,
      notes: {
        orgId,
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
