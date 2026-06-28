import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { Entity_Type } from "@/lib/generated/prisma/browser";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ cardId: string }> },
) {
  try {
    const { cardId } = await params;
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const logs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: cardId,
        entityType: Entity_Type.CARD,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    return NextResponse.json(logs);
  } catch {
    return new NextResponse("Internal error", { status: 500 });
  }
}
