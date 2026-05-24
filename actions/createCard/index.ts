"use server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { Action, Entity_Type } from "@/lib/generated/prisma/client";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { createCardSchema } from "./schema";
import { createAuditLog } from "@/lib/createAuditLog";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, boardId, listId } = data;
  let card;

  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
    });

    if (!list) {
      return {
        error: "List not found",
      };
    }

    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    card = await db.card.create({
      data: {
        title,
        listId,
        order: lastCard ? lastCard.order + 1 : 1,
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
      error: "Failed to create card",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createCard = createSafeAction(createCardSchema, handler);
