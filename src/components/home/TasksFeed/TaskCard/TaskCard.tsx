import { useEntity, useUser } from "replyke";

import TaskHeader from "./TaskHeader";
import { TaskAction } from "./TaskAction";
import { cn } from "../../../../lib/utils";
import { Button } from "../../../ui/button";
import { Task } from "../../../../types/Task";

function TaskCard({
  isKm,
  location,
  handleOpenManagerSheet,
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
  handleOpenManagerSheet: () => void;
  handleOpenDiscussionSheet: () => void;
}) {
  const { user } = useUser();
  const { entity } = useEntity();
  const task = entity as Task;

  return (
    <div
      onClick={handleOpenManagerSheet}
      className={cn(
        "shadow-md rounded-md relative",
        user && user.id === task?.user?.id ? "cursor-pointer" : ""
      )}
    >
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
            handleOpenDiscussionSheet();
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
