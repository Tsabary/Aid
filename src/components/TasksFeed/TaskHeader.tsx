import { UserAvatar } from "replyke";
import { helpCategories } from "../../constants/categories";
import { User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function TaskHeader({ task }: { task: Task }) {
  const requiredVoluneers = task.metadata.volunteersRequired
    ? task.metadata.volunteersRequired - (task.metadata.volunteersAssigned || 0)
    : null;

  const requiredVoluneersIndicator = (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="flex gap-1 items-center text-xs">
            <User className="size-3" />
            {requiredVoluneers === null
              ? "∞"
              : requiredVoluneers === 0
              ? "✓"
              : requiredVoluneers}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {requiredVoluneers === null
              ? "Unlimited amount of volunteers required"
              : requiredVoluneers === 0
              ? "No more volunteers required"
              : requiredVoluneers + " more volunteers required"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="grid gap-2 p-2 bg-blue-50 rounded-t-md">
      {/* First header line */}
      <div className="rounded-md px-2 py-0.5 bg-blue-200 text-xs text-gray-500 w-max">
        {helpCategories[task.keywords[0]]}
      </div>

      {/* Second header line */}
      <div className="flex items-center">
        <div className="flex flex-1 items-center gap-2">
          <UserAvatar
            size={24}
            user={{ id: task.user.id, avatar: task.user.avatar }}
          />
          <p className="text-sm font-semibold text-gray-700">
            {task.user.name?.split(" ")[0]}
          </p>
        </div>
        {requiredVoluneersIndicator}
      </div>
    </div>
  );
}

export default TaskHeader;
