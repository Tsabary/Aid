import SingleTaskApplicant from "./SingleTaskApplicant";

function TaskApplicants({
  task,
  applications,
}: {
  task?: Task;
  applications: TaskApplication[];
}) {
  if (!task) return null;

  if (applications.length === 0) {
    return (
      <div className="w-full px-4">
        <h1 className="font-semibold text-xl">אין מתנדבים חדשים</h1>
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
