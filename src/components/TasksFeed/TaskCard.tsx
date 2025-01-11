import { useState } from "react";

import EditTask from "./EditTask";

import ApplyToHelp from "./ApplyToHelp";
import TaskHeader from "./TaskHeader";
import TaskBody from "./TaskBody";
import TaskInProgress from "./TaskInProgress";
import { useUser } from "replyke";

function TaskCard({
  task: taskProp,
  handleOpenDrawer,
}: {
  task: Task;
  handleOpenDrawer: () => Promise<void>;
}) {
  const { user } = useUser();
  const [task, setTask] = useState<Task>(taskProp);

  return (
    <div className="shadow-md rounded-md relative">
      {/* Header */}
      <div
        onClick={() => user && user.id === task.authorId && handleOpenDrawer()}
        className={user && user.id === task.authorId ? "cursor-pointer" : ""}
      >
        <TaskHeader task={task} />

        {/* Body */}
        <TaskBody task={task} />
      </div>

      <div className="rounded-b-md overflow-hidden">
        {user?.id === task.authorId ? (
          <EditTask task={task} setTask={setTask} />
        ) : task.status === "open" ? (
          <ApplyToHelp
            task={task}
            setTask={setTask}
          />
        ) : (
          <TaskInProgress />
        )}
      </div>
    </div>
  );
}

export default TaskCard;
