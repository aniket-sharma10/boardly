import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { MAX_FREE_BOARDS } from "@/constants/boards";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const checkSubscription = async () => {
  const { orgId } = await auth();

  if (!orgId) return false;

  const subscription = await db.orgSubscription.findUnique({
    where: {
      orgId,
    },
    select: {
      razorpaySubscriptionId: true,
      razorpayCurrentPeriodEnd: true,
      razorpayCustomerId: true,
      razorpayPriceId: true,
    },
  });

  if (!subscription) {
    return false;
  }

  const isValid =
    !!subscription.razorpayPriceId &&
    !!subscription.razorpayCurrentPeriodEnd &&
    subscription.razorpayCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now();

  return !!isValid;
};

export const getAvailableCount = async () => {
  const { orgId } = await auth();

  if (!orgId) throw new Error("Unauthorized");

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  });

  return orgLimit ? MAX_FREE_BOARDS - orgLimit.count : MAX_FREE_BOARDS;
};
