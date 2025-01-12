import { UserAvatar } from "replyke";
import { helpCategories } from "../../constants/categories";
import { User } from "lucide-react";

function TaskHeader({ task }: { task: Task }) {
  const requiredVoluneers = task.metadata.volunteersRequired
    ? task.metadata.volunteersRequired - (task.metadata.volunteersAssigned || 0)
    : null;

  return (
    <div className="grid gap-2 p-2 bg-blue-50 rounded-t-md">
      {/* Top */}
      <div className="rounded-md px-2 py-0.5 bg-blue-200 text-xs text-gray-500 w-max">
        {helpCategories[task.keywords[0]]}
      </div>

      {/* First header line */}
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
        {/* <div className="rounded-md px-2 py-0.5 bg-gray-200">
          <p className="text-xs text-gray-500">
            {districtsDictionary[task.district]}
          </p>
        </div> */}
      </div>

      {/* Second header line */}
      <div className="flex w-full justify-end items-start gap-2">
        {/* <div
          className={cn(
            "rounded-md px-2 py-0.5 text-xs",
            task.metadata.status === "open"
              ? "text-white"
              : task.metadata.status === "in_progress"
              ? "text-white"
              : "text-gray-500",
            task.metadata.status === "open"
              ? "bg-green-400"
              : task.metadata.status === "in_progress"
              ? "bg-yellow-300"
              : "bg-blue-200"
          )}
        >
          {statusDictionary[task.metadata.status]}
        </div> */}

        <div className="flex gap-1 items-center text-xs">
          <User className="size-3" />
          {requiredVoluneers === null
            ? "∞"
            : requiredVoluneers === 0
            ? "✓"
            : requiredVoluneers}
        </div>
      </div>
    </div>
  );
}

export default TaskHeader;
