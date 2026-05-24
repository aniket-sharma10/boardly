"use client";

import { ActivityItem } from "@/components/activityItem";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditLog } from "@/lib/generated/prisma/browser";
import { ActivityIcon } from "lucide-react";

interface ActivityProps {
  items: AuditLog[];
}

export const Activity = ({ items }: ActivityProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-x-3">
        <ActivityIcon className="w-6 h-6 text-neutral-700" />
        <div className="w-full">
          <p className="font-semibold text-neutral-700 mb-2">Activity</p>
          <ol className="mt-2 space-y-4">
            {items.map((log) => (
              <ActivityItem key={log.id} data={log} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="w-6 h-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-10 bg-neutral-200" />
      </div>
    </div>
  );
};
