import { useState } from "react";
import { useUser } from "replyke";

import EditTask from "./EditTask";

import ApplyToHelp from "./ApplyToHelp";
import TaskHeader from "./TaskHeader";
import TaskInProgress from "./TaskInProgress";

function TaskCard({
  task: taskProp,
  handleOpenDrawer,
}: {
  task: Task;
  handleOpenDrawer: () => Promise<void>;
}) {
  const { user } = useUser();
  const [task, setTask] = useState<Task>(taskProp);

  const requiredVoluneers = task.metadata.volunteersRequired
    ? task.metadata.volunteersRequired - (task.metadata.volunteersAssigned || 0)
    : null;

  return (
    <div className="shadow-md rounded-md relative">
      {/* Header */}
      <div
        onClick={() => user && user.id === task.user.id && handleOpenDrawer()}
        className={user && user.id === task.user.id ? "cursor-pointer" : ""}
      >
        <TaskHeader task={task} />

        {/* Body */}
        <div className="p-4">
          <p className="font-semibold text-sm">{task.content}</p>
        </div>
      </div>

      <div className="rounded-b-md overflow-hidden">
        {user?.id === task.user.id ? (
          <EditTask task={task} setTask={setTask} />
        ) : task.metadata.status === "open" &&
          (requiredVoluneers === null || requiredVoluneers > 0) ? (
          <ApplyToHelp task={task} setTask={setTask} />
        ) : (
          <TaskInProgress />
        )}
      </div>
    </div>
  );
}

export default TaskCard;
