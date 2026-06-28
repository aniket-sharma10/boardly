import crypto from "crypto";

import { db } from "@/lib/db";

type RazorpaySubscriptionEntity = {
  id: string;
  plan_id?: string;
  current_end?: number;
  customer_id?: string;
  notes?: {
    orgId?: string;
    userId?: string;
  };
};

type RazorpaySubscriptionEvent = {
  event?: string;
  payload?: {
    subscription?: {
      entity?: RazorpaySubscriptionEntity;
    };
  };
};

export async function GET() {
  return Response.json({
    success: true,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.text();

    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return new Response("Missing signature", {
        status: 400,
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return new Response("Invalid signature", {
        status: 400,
      });
    }

    const event = JSON.parse(body) as RazorpaySubscriptionEvent;
    console.log(JSON.stringify(event, null, 2));

    const subscriptionEvents = new Set([
      "subscription.activated",
      "subscription.charged",
      "subscription.updated",
      "subscription.completed",
      "subscription.cancelled",
      "subscription.paused",
    ]);

    if (event.event && subscriptionEvents.has(event.event)) {
      const subscription = event.payload?.subscription?.entity;

      if (!subscription) {
        return new Response("Missing subscription", {
          status: 400,
        });
      }

      const orgId = subscription.notes?.orgId;
      const userId = subscription.notes?.userId;
      const currentPeriodEnd = subscription.current_end
        ? new Date(subscription.current_end * 1000)
        : null;

      const data = {
        razorpaySubscriptionId: subscription.id,
        razorpayCustomerId: userId ?? subscription.customer_id,
        razorpayPriceId: subscription.plan_id,
        razorpayCurrentPeriodEnd: currentPeriodEnd,
      };

      if (orgId) {
        await db.orgSubscription.upsert({
          where: {
            orgId,
          },
          create: {
            orgId,
            ...data,
          },
          update: data,
        });

        return new Response("OK");
      }

      await db.orgSubscription.updateMany({
        where: {
          razorpaySubscriptionId: subscription.id,
        },
        data,
      });
    }

    return new Response("OK");
  } catch (error) {
    console.log(error);

    return new Response("Webhook Error", {
      status: 500,
    });
  }
}
