import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { MAX_FREE_BOARDS } from "@/constants/boards";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

type SubscriptionRecord = {
  id: string;
  orgId: string;
  razorpaySubscriptionId: string | null;
  razorpayCurrentPeriodEnd: Date | null;
  razorpayCustomerId: string | null;
  razorpayPriceId: string | null;
};

const isActiveSubscription = (
  subscription: SubscriptionRecord | null,
): subscription is SubscriptionRecord => {
  if (!subscription) return false;

  return (
    !!subscription.razorpayPriceId &&
    !!subscription.razorpayCurrentPeriodEnd &&
    subscription.razorpayCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now()
  );
};

const getUserOrgIds = async (userId: string) => {
  try {
    const client = await clerkClient();
    const memberships = await client.users.getOrganizationMembershipList({
      userId,
      limit: 100,
    });

    return memberships.data.map((membership) => membership.organization.id);
  } catch {
    return [];
  }
};

export const getSubscription = async () => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) return null;

  const orgSubscription = await db.orgSubscription.findUnique({
    where: {
      orgId,
    },
    select: {
      id: true,
      orgId: true,
      razorpaySubscriptionId: true,
      razorpayCurrentPeriodEnd: true,
      razorpayCustomerId: true,
      razorpayPriceId: true,
    },
  });

  if (isActiveSubscription(orgSubscription)) {
    if (!orgSubscription.razorpayCustomerId) {
      try {
        await db.orgSubscription.update({
          where: { orgId },
          data: { razorpayCustomerId: userId },
        });

        return { ...orgSubscription, razorpayCustomerId: userId };
      } catch {
        return orgSubscription;
      }
    }

    return orgSubscription;
  }

  const userSubscription = await db.orgSubscription.findFirst({
    where: {
      razorpayCustomerId: userId,
    },
    select: {
      id: true,
      orgId: true,
      razorpaySubscriptionId: true,
      razorpayCurrentPeriodEnd: true,
      razorpayCustomerId: true,
      razorpayPriceId: true,
    },
  });

  if (isActiveSubscription(userSubscription)) {
    return userSubscription;
  }

  const userOrgIds = await getUserOrgIds(userId);
  const membershipSubscriptions = await db.orgSubscription.findMany({
    where: {
      orgId: {
        in: userOrgIds,
      },
    },
    select: {
      id: true,
      orgId: true,
      razorpaySubscriptionId: true,
      razorpayCurrentPeriodEnd: true,
      razorpayCustomerId: true,
      razorpayPriceId: true,
    },
  });

  const membershipSubscription =
    membershipSubscriptions.find(isActiveSubscription) ?? null;

  if (!membershipSubscription) {
    return null;
  }

  if (!membershipSubscription.razorpayCustomerId) {
    try {
      await db.orgSubscription.update({
        where: { orgId: membershipSubscription.orgId },
        data: { razorpayCustomerId: userId },
      });

      return { ...membershipSubscription, razorpayCustomerId: userId };
    } catch {
      return membershipSubscription;
    }
  }

  return membershipSubscription;
};

export const checkSubscription = async () => {
  const subscription = await getSubscription();

  return !!subscription;
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
