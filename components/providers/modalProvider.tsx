"use client";

import { useEffect, useState } from "react";
import { CardModal } from "../modals/cardModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <>
      <CardModal />
    </>
  );
};
