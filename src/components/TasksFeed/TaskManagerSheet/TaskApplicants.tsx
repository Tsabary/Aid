import { useEntity } from "replyke";
import SingleTaskApplicant from "../SingleTaskApplicant";
import { Task } from "../../../types/Task";

function TaskApplicants({ applications }: { applications: TaskApplication[] }) {
  const { entity } = useEntity();
  const task = entity as Task;

  if (!task) return null;

  if (applications.length === 0) {
    return (
      <div className="w-full px-4 grid justify-center items-center h-full font-medium text-xl text-center text-gray-300">
        No new volunteers
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      {applications.map((application) => (
        <SingleTaskApplicant
          task={task}
          application={application}
          isApplicant
          key={application.applicant_id}
        />
      ))}
    </div>
  );
}

export default TaskApplicants;
