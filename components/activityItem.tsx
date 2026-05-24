import { format } from "date-fns";
import type { AuditLog } from "@/lib/generated/prisma/browser";
import { generateLogMessage } from "@/lib/generateLogMessage";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface ActivityItemProps {
  data: AuditLog;
}

export const ActivityItem = ({ data }: ActivityItemProps) => {
  const { createdAt } = data;

  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="w-8 h-8">
        <AvatarImage
          src={data.userImage || undefined}
          alt={data.userName || "User"}
        />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {data.userName}
          </span>{" "}
          {generateLogMessage(data)}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};
