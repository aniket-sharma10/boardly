import { CheckCircle2, CreditCard } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { MAX_FREE_BOARDS } from "@/constants/boards";
import { getSubscription } from "@/lib/subscription";
import { UpgradeButton } from "./_components/upgradeButton";

const BillingPage = async () => {
  const subscription = await getSubscription();
  const isPro = !!subscription;

  return (
    <div className="w-full space-y-6">
      <div>
        <div className="flex items-center gap-x-2 text-lg font-semibold text-neutral-700">
          <CreditCard className="h-6 w-6" />
          Billing
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage the plan used by your Boardly workspaces.
        </p>
      </div>

      <Separator />

      <div className="rounded-md border bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-x-2">
              {isPro ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              ) : null}
              <h2 className="font-semibold text-neutral-800">
                {isPro ? "Boardly Pro" : "Free Plan"}
              </h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {isPro
                ? "Your account has Pro access across your workspaces."
                : `Free workspaces can have up to ${MAX_FREE_BOARDS} open boards.`}
            </p>
            {subscription?.razorpayCurrentPeriodEnd ? (
              <p className="mt-1 text-xs text-muted-foreground">
                Current period ends on{" "}
                {subscription.razorpayCurrentPeriodEnd.toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  },
                )}
              </p>
            ) : null}
          </div>

          {isPro ? null : <UpgradeButton />}
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
