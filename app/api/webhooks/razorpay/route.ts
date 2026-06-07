import crypto from "crypto";

import { db } from "@/lib/db";

export async function GET() {
  return Response.json({
    success: true,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.text();

    const signature = req.headers.get("x-razorpay-signature");

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return new Response("Invalid signature", {
        status: 400,
      });
    }

    const event = JSON.parse(body);
    console.log(JSON.stringify(event, null, 2));

    if (event.event === "subscription.activated") {
      const subscription = event.payload.subscription.entity;

      const orgId = subscription.notes.orgId;

      await db.orgSubscription.upsert({
        where: {
          orgId,
        },
        create: {
          orgId,

          razorpaySubscriptionId: subscription.id,

          razorpayPriceId: subscription.plan_id,

          razorpayCurrentPeriodEnd: new Date(subscription.current_end * 1000),
        },
        update: {
          razorpaySubscriptionId: subscription.id,

          razorpayPriceId: subscription.plan_id,

          razorpayCurrentPeriodEnd: new Date(subscription.current_end * 1000),
        },
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
