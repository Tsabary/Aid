import { useEntity } from "replyke";

import TaskHeader from "./TaskHeader";
import { TaskAction } from "./TaskAction";
import { Button } from "../../../ui/button";
import { Task } from "../../../../types/Task";

function TaskCard({
  isKm,
  location,
  handleOpenDiscussionSheet,
}: {
  isKm: boolean;
  location: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  } | null;
  handleOpenDiscussionSheet: (passedTask: Task) => void;
}) {
  const { entity } = useEntity();
  const task = entity as Task;

  return (
    <div className="shadow-md rounded-md relative">
      <TaskHeader isKm={isKm} location={location} />

      {/* Body */}
      <div className="p-4 grid gap-2">
        <p className="font-semibold text-sm">{task?.title}</p>
        <p className="text-sm text-gray-600">{task?.content}</p>
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOpenDiscussionSheet(task);
          }}
          className="text-xs text-start w-max h-7 mt-2"
        >
          Discussion {task?.repliesCount ? `(${task.repliesCount})` : ""}
        </Button>
      </div>

      <TaskAction handleOpenDiscussionSheet={handleOpenDiscussionSheet} />
    </div>
  );
}

export default TaskCard;
