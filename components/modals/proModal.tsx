"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/useProModal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAction } from "@/hooks/useAction";
import { razorpayRedirect } from "@/actions/razorpayRedirect";
import { toast } from "sonner";

export const ProModal = () => {
  const proModal = useProModal();

  const { execute, isLoading } = useAction(razorpayRedirect, {
    onSuccess: async (subscriptionId) => {
      const loaded = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js",
      );

      if (!loaded) {
        toast.error("Failed to load Razorpay.");

        return;
      }

      const paymentObject = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

        subscription_id: subscriptionId as string,

        name: "Boardly",

        description: "Boardly Pro Subscription",
        theme: {
          color: "#6366f1",
        },
      });

      paymentObject.open();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    execute({});
    console.log("Upgrade button clicked");
  };

  const loadScript = (src: string) => {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement("script");

      script.src = src;

      script.onload = () => {
        resolve(true);
        console.log("Script loaded successfully");
      };
      script.onerror = (error) => {
        resolve(false);
        console.error("Failed to load script:", src);
        console.error("Failed to load script:", error);
      };

      document.body.appendChild(script);
      console.log("Script added to the document");
    });
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md w-fit overflow-hidden p-0">
        <div className="relative flex aspect-video items-center justify-center">
          <Image src="/image.png" alt="Hero" className="object-cover" fill />
        </div>
        <div className="mx-auto space-y-6 p-6 text-neutral-700">
          <h2 className="text-xl font-semibold">
            Upgrade to Boardly Pro Today!
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of Boardly
          </p>
          <div className="pl-3">
            <ul className="list-disc text-sm">
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            disabled={isLoading}
            onClick={onClick}
            className="w-full"
            variant="primary"
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
