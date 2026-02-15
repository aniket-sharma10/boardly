"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FormButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "destructive"
    | "ghost"
    | "link"
    | "primary"
    | "secondary";
}

export const FormButton = ({
  children,
  disabled,
  className,
  variant = "primary",
}: FormButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant={variant}
      size="sm"
      disabled={pending || disabled}
      className={cn(className)}
    >
      {children}
    </Button>
  );
};
