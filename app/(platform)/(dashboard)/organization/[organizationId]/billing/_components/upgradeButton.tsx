"use client";

import { CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/useProModal";

export const UpgradeButton = () => {
  const proModal = useProModal();

  return (
    <Button onClick={proModal.onOpen} variant="primary">
      <CreditCard className="h-4 w-4" />
      Upgrade
    </Button>
  );
};
