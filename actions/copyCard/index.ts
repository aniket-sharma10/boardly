"use server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { copyCardSchema } from "./schema";
import { Action, Entity_Type } from "@/lib/generated/prisma/client";
import { createAuditLog } from "@/lib/createAuditLog";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;
  let card;
  try {
    const cardToCopy = await db.card.findFirst({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });
    if (!cardToCopy) return { error: "Card not found" };

    const lastCard = await db.card.findFirst({
      where: {
        listId: cardToCopy.listId,
      },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 0;

    card = await db.card.create({
      data: {
        title: `${cardToCopy.title} Copy`,
        description: cardToCopy.description,
        listId: cardToCopy.listId,
        order: newOrder,
      },
    });

    await createAuditLog({
      entityId: card.id,
      entityType: Entity_Type.CARD,
      entityTitle: card.title,
      action: Action.CREATE,
    });
  } catch {
    return {
      error: "Failed to copy card",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const copyCard = createSafeAction(copyCardSchema, handler);
