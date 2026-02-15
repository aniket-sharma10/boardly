import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { FormPopover } from "@/components/form/formPopover";
import { Tooltip } from "@/components/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { HelpCircle, User2 } from "lucide-react";
import { db } from "@/lib/db";

export const BoardList = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    return redirect("/selectOrg");
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-2">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            style={{
              backgroundImage: `url(${board.imageThumbUrl})`,
            }}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden hover:opacity-75 transition"
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"></div>
            <p className="relative text-white font-semibold">{board.title}</p>
            <Tooltip
              sideOffset={75}
              side="right"
              description={`Free Workspaces can have up to 5 open boards. For unlimited boards, upgrade to Pro plan.`}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-3.5 w-3.5" />
            </Tooltip>
          </Link>
        ))}
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

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
