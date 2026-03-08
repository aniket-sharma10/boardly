"use server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { updateCardOrderSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { items, boardId } = data;
  let cards;

  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: { board: { orgId } },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      }),
    );

    cards = await db.$transaction(transaction);
  } catch {
    return {
      error: "Failed to reorder card",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: cards };
};

export const updateCardOrder = createSafeAction(updateCardOrderSchema, handler);
