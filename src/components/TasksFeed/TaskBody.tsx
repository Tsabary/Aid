export default function TaskBody({ task }: { task: Task }) {
  function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  const formattedStartDate = formatDate(task.startDate);
  const formattedEndDate = formatDate(task.endDate);

  const requiredVoluneers = task.volunteersRequired - task.volunteersAssigned;

  return (
    <>
      <div className="p-2">
        {task.urgent && (
          <p className="text-red-500 text-sm border w-max border-red-500 px-2 py-0.5 rounded-md mb-2 mt-1">
            דחיפות גבוהה
          </p>
        )}
        <p className="font-semibold">{task.description}</p>
        {task.volunteersRequired === 999 && (
          <p className="text-sm mt-3">אין הגבלה למספר המתנדבים</p>
        )}
        {requiredVoluneers !== 999 && requiredVoluneers > 1 && (
          <p className="text-sm mt-3">
            דרושים עוד {task.volunteersRequired - task.volunteersAssigned}{" "}
            מתנדבים
          </p>
        )}
        {requiredVoluneers !== 999 && requiredVoluneers === 1 && (
          <p className="text-sm mt-3">דרוש עוד מתנדב אחד</p>
        )}
      </div>

      <div className="p-2 border-t border-gray-200">
        <p className="text-xs">
          {`עזרה נחוצה ב: ${
            formattedStartDate === formattedEndDate
              ? formattedStartDate
              : [formattedStartDate, formattedEndDate].join(" - ")
          }`}
        </p>
      </div>
    </>
  );
}
