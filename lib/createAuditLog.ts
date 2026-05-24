import { auth, currentUser } from "@clerk/nextjs/server";

import { Action, Entity_Type } from "@/lib/generated/prisma/client";
import { db } from "./db";

interface Props {
  entityId: string;
  entityType: Entity_Type;
  entityTitle: string;
  action: Action;
}

export const createAuditLog = async (props: Props) => {
  try {
    const { userId, orgId } = await auth();
    const user = await currentUser();

    if (!userId || !orgId) {
      throw new Error("User not found");
    }

    await db.auditLog.create({
      data: {
        userId,
        orgId,
        entityId: props.entityId,
        entityType: props.entityType,
        entityTitle: props.entityTitle,
        action: props.action,
        userName: user?.fullName || "Unknown",
        userImage: user?.imageUrl || "",
      },
    });
  } catch (error) {
    console.log("[Audit_Log_Error]", error);
  }
};
