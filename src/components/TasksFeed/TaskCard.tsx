import { useEntity, useUser } from "replyke";

import TaskHeader from "./TaskHeader";
import { TaskAction } from "./TaskAction";
import { cn } from "../../lib/utils";

function TaskCard({ handleOpenDrawer }: { handleOpenDrawer: () => void }) {
  const { user } = useUser();
  const { entity: task } = useEntity();

  return (
    <div
      onClick={handleOpenDrawer}
      className={cn(
        "shadow-md rounded-md relative",
        user && user.id === task?.user?.id ? "cursor-pointer" : ""
      )}
    >
      <TaskHeader task={task} />

      {/* Body */}
      <div className="p-4 grid gap-2">
        <p className="font-semibold text-sm">{task?.title}</p>
        <p className="text-sm text-gray-600">{task?.content}</p>
      </div>

      <TaskAction />
    </div>
  );
}

export default TaskCard;
