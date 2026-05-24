"use server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { Action, Entity_Type } from "@/lib/generated/prisma/client";
import { createAuditLog } from "@/lib/createAuditLog";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { updateListSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, id, boardId } = data;
  let list;

  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      data: {
        title,
      },
    });

    await createAuditLog({
      entityId: list.id,
      entityType: Entity_Type.LIST,
      entityTitle: list.title,
      action: Action.UPDATE,
    });
  } catch {
    return {
      error: "Failed to update list",
    };
  }

  revalidatePath(`/board/${id}`);
  return { data: list };
};

export const updateList = createSafeAction(updateListSchema, handler);
