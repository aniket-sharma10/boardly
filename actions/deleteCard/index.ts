"use server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { Action, Entity_Type } from "@/lib/generated/prisma/client";
import { createAuditLog } from "@/lib/createAuditLog";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { deleteCardSchema } from "./schema";

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
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    await createAuditLog({
      entityId: card.id,
      entityType: Entity_Type.CARD,
      entityTitle: card.title,
      action: Action.DELETE,
    });
  } catch {
    return {
      error: "Failed to delete card",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const deleteCard = createSafeAction(deleteCardSchema, handler);
