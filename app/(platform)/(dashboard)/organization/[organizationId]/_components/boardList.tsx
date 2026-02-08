import { FormPopover } from "@/components/form/formPopover";
import { Tooltip } from "@/components/tooltip";
import { HelpCircle, User2 } from "lucide-react";

export const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-2">
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="h-full w-full relative aspect-video bg-muted rounded-sm flex flex-col items-center justify-center gap-y-1 hover:opacity-75 transition"
          >
            <p className="text-sm font-semibold">Create New Board</p>
            <p className="text-xs">5 remaining</p>
            <Tooltip
              sideOffset={75}
              side="right"
              description={`Free Workspaces can have up to 5 open boards. For unlimited boards, upgrade to Pro plan.`}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-3.5 w-3.5" />
            </Tooltip>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};
