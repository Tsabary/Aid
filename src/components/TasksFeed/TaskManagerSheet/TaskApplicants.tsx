import { useEntity } from "replyke";
import SingleTaskApplicant from "./SingleTaskApplicant";
import { Task } from "../../../types/Task";

function TaskApplicants() {
  const { entity } = useEntity();
  const task = entity as Task;

  if (!task) return null;

  if (task.metadata.applicants.length === 0) {
    return (
      <div className="w-full px-4 grid justify-center items-center h-full font-medium text-xl text-center text-gray-300">
        No new volunteers
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      {task.metadata.applicants.map((applicantId) => (
        <SingleTaskApplicant applicantId={applicantId} key={applicantId} />
      ))}
    </div>
  );
}

export default TaskApplicants;
