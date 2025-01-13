import { useEntity, useUser } from "replyke";
import EditTask from "./EditTask";
import ApplyToHelp from "./ApplyToHelp";
import FullyStaffedOrComplete from "./FullyStaffedOrComplete";
import { Task } from "../../../../types/Task";

function TaskAction({
  handleOpenDiscussionSheet,
}: {
  handleOpenDiscussionSheet: () => void;
}) {
  const { user } = useUser();
  const { entity } = useEntity();
  const task = entity as Task;

  const requiredVoluneers = task?.metadata.volunteersRequired
    ? task.metadata.volunteersRequired - (task.metadata.a || 0)
    : null;

  return (
    <div className="rounded-b-md overflow-hidden">
      {user?.id === task?.user?.id ? (
        <EditTask />
      ) : !task?.metadata.isCompleted &&
        (requiredVoluneers === null || requiredVoluneers > 0) ? (
        <ApplyToHelp handleOpenDiscussionSheet={handleOpenDiscussionSheet} />
      ) : (
        <FullyStaffedOrComplete />
      )}
    </div>
  );
}

export default TaskAction;
