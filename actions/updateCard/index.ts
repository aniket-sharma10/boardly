"use server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { updateCardSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { boardId, id, ...values } = data;
  let card;

  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId
          }
        },
      },
      data: {
        ...values,
      },
    });
  } catch {
    return {
      error: "Failed to update board",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateCard = createSafeAction(updateCardSchema, handler);
