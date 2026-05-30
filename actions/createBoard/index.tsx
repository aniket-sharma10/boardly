"use server";

import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { Action, Entity_Type } from "@/lib/generated/prisma/client";
import { createAuditLog } from "@/lib/createAuditLog";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/createSafeAction";
import { createBoardSchema } from "./schema";
import { incrementAvailableCount, hasAvailableCount } from "@/lib/orgLimit";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const hasCount = await hasAvailableCount();
  if (!hasCount) {
    return {
      error: "Board limit reached. Please upgrade to Pro for unlimited boards.",
    };
  }

  const { title, image } = data;
  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUserName] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageUserName ||
    !imageLinkHtml
  ) {
    return {
      error: "Missing required fields",
    };
  }

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHtml,
        imageUserName,
      },
    });

    await incrementAvailableCount();

    await createAuditLog({
      entityId: board.id,
      entityType: Entity_Type.BOARD,
      entityTitle: board.title,
      action: Action.CREATE,
    });
  } catch {
    return {
      error: "Failed to create board",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(createBoardSchema, handler);
