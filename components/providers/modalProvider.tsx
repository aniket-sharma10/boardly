"use client";

import { useEffect, useState } from "react";
import { CardModal } from "../modals/cardModal";
import { ProModal } from "../modals/proModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
};
