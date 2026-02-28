import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { ListContainer } from "./_components/listContainer";

interface BoardIdPageProps {
  params: Promise<{
    boardId: string;
  }>;
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const { orgId } = await auth();
  const { boardId } = await params;

  if (!orgId) {
    return redirect("/selectOrg");
  }

  const lists = await db.list.findMany({
    where: {
      boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer lists={lists} boardId={boardId} />
    </div>
  );
};

export default BoardIdPage;
