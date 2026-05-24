import { Action } from "@/lib/generated/prisma/browser";
import type { AuditLog } from "@/lib/generated/prisma/browser";

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityType, entityTitle } = log;
  switch (action) {
    case Action.CREATE:
      return `Created ${entityType.toLowerCase()} "${entityTitle}"`;
    case Action.UPDATE:
      return `Updated ${entityType.toLowerCase()} "${entityTitle}"`;
    case Action.DELETE:
      return `Deleted ${entityType.toLowerCase()} "${entityTitle}"`;
    default:
      return `${action} ${entityType.toLowerCase()} "${entityTitle}"`;
  }
};
