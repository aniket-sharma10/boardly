import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { AuditLog } from "@/lib/generated/prisma/browser";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityItem } from "@/components/activityItem";

export const ActivityList = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/selectOrg");
  }

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <ol className="mt-4 space-y-4">
      <p className="text-xs text-center text-muted-foreground hidden last:block">
        No activity logs found.
      </p>
      {auditLogs.map((log) => (
        <ActivityItem key={log.id} data={log as AuditLog} />
      ))}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="mt-4 space-y-4">
      <Skeleton className="w-4/5 h-14 bg-neutral-200" />
      <Skeleton className="w-1/2 h-14 bg-neutral-200" />
      <Skeleton className="w-7/10 h-14 bg-neutral-200" />
      <Skeleton className="w-4/5 h-14 bg-neutral-200" />
      <Skeleton className="w-7/10 h-14 bg-neutral-200" />
    </ol>
  );
};
