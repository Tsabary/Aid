import { useEntity } from "replyke";
import { Task } from "../../../types/Task";
import SingleTaskApplicant from "./SingleTaskApplicant";

function TaskDismissed() {
  const { entity } = useEntity();
  const task = entity as Task;
  if (!task) return null;

  if (task.metadata.dismissed.length === 0) {
    return (
      <div className="w-full px-4 grid justify-center items-center h-full font-medium text-xl text-center text-gray-300">
        No volunteers have been dismissed
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      {task.metadata.dismissed.map((applicantId) => (
        <SingleTaskApplicant applicantId={applicantId} key={applicantId} />
      ))}
    </div>
  );
}

export default TaskDismissed;
