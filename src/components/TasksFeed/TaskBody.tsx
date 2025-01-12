export default function TaskBody({ task }: { task: Task }) {
  // function formatDate(date: Date) {
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
  //   const year = date.getFullYear();

  //   return `${day}/${month}/${year}`;
  // }
  // const formattedStartDate = formatDate(task.metadata.startDate);
  // const formattedEndDate = formatDate(task.metadata.endDate);

  return (
    <>
      <div className="p-2">
        <p className="font-semibold text-sm">{task.content}</p>
      </div>

      {/* <div className="p-2 border-t border-gray-200">
        <p className="text-xs">
          {`עזרה נחוצה ב: ${
            formattedStartDate === formattedEndDate
              ? formattedStartDate
              : [formattedStartDate, formattedEndDate].join(" - ")
          }`}
        </p>
      </div> */}
    </>
  );
}
