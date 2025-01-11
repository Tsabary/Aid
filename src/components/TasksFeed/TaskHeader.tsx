import { UserAvatar } from "replyke";
import { statusDictionary } from "../../constants/statusDictionary";
import { helpCategories } from "../../constants/categories";

function TaskHeader({ task }: { task: Task }) {
  return (
    <div className="p-2 bg-blue-50 rounded-t-md">
      {/* First header line */}
      <div className="flex items-center">
        <div className="flex flex-1 items-center">
          <UserAvatar user={{ avatar: task.authorAvatar }} />
          <p className="text-sm mx-3 font-semibold text-gray-700">
            {task.authorName.split(" ")[0]}
          </p>
        </div>
        {/* <div className="rounded-md px-2 py-0.5 bg-gray-200">
          <p className="text-xs text-gray-500">
            {districtsDictionary[task.district]}
          </p>
        </div> */}
      </div>

      {/* Second header line */}
      <div className="flex items-end mt-2">
        <div className="flex-1 flex">
          <div
            className={[
              "rounded-md px-2 py-0.5",
              task.status === "open"
                ? "bg-green-400"
                : task.status === "in_progress"
                ? "bg-yellow-300"
                : "bg-blue-200",
            ].join(" ")}
          >
            <p
              className={[
                "text-xs",
                task.status === "open"
                  ? "text-white"
                  : task.status === "in_progress"
                  ? "text-white"
                  : "text-gray-500",
              ].join(" ")}
            >
              {statusDictionary[task.status]}
            </p>
          </div>
        </div>
        <div className="rounded-md px-2 py-0.5 bg-blue-200">
          <p className="text-xs text-gray-500">
            {helpCategories[task.category]}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TaskHeader;
