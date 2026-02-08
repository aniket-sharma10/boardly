import {
  Tooltip as TooltipPrimitive,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface TooltipProps {
  children: React.ReactNode;
  description: string;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

export const Tooltip = ({
  children,
  description,
  side = "bottom",
  sideOffset = 0,
  align = "center",
}: TooltipProps) => {
  return (
    <TooltipProvider>
      <TooltipPrimitive delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          align={align}
          className="text-xs max-w-52 break-words"
        >
          {description}
        </TooltipContent>
      </TooltipPrimitive>
    </TooltipProvider>
  );
};
