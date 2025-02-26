import { useMemo } from "react";
import { useEntity } from "@replyke/react-js";
import { UserAvatar } from "@replyke/ui-core-react-js";
import { helpCategories } from "../../../../constants/categories";
import { Task } from "../../../../types/Task";
import RequiredVolunteersIndicator from "../../../shared/RequiredVolunteersIndicator";
import DistanceLocationIndicator from "../../../shared/DistanceLocationIndicator";

function TaskHeader({
  isKm,
  location,
}: {
  isKm: boolean;
  location: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  } | null;
}) {
  const { entity } = useEntity();
  const task = entity as Task;

  const distance = useMemo(() => {
    if (!task.location || !location) return null;
    const taskCoordinates = task.location.coordinates;
    const locationCoordinates = location.coordinates;

    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

    const [taskLng, taskLat] = taskCoordinates; // Destructure taskCoordinates
    const { lng: locationLng, lat: locationLat } = locationCoordinates; // Destructure locationCoordinates

    const R = isKm ? 6371 : 3958.8; // Earth's radius in kilometers or miles
    const dLat = toRadians(locationLat - taskLat);
    const dLng = toRadians(locationLng - taskLng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(taskLat)) *
        Math.cos(toRadians(locationLat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in the chosen unit
  }, [location, task, isKm]);

  // const requiredVoluneers = task.metadata.volunteersRequired
  //   ? task.metadata.volunteersRequired - (task.metadata.applicants.length || 0)
  //   : null;

  const requiredVoluneers = task.metadata.volunteersRequired;

  if (!task) return null;

  return (
    <div className="grid gap-2 p-2 bg-blue-50 rounded-t-md">
      {/* First header line */}
      <div className="flex gap-2 justify-between">
        <div className="rounded-md px-2 py-0.5 bg-blue-200 text-xs text-gray-500 w-max">
          {helpCategories[task.keywords[0] as TaskCategory]}
        </div>
        <DistanceLocationIndicator
          distance={distance}
          task={task}
          isKm={isKm}
        />
      </div>

      {/* Second header line */}
      <div className="flex items-center">
        <div className="flex flex-1 items-center gap-2">
          <UserAvatar
            size={24}
            user={{ id: task.user?.id, avatar: task.user?.avatar }}
          />
          <p className="text-sm font-semibold text-gray-700">
            {task.user?.name?.split(" ")[0]}
          </p>
        </div>
        <RequiredVolunteersIndicator requiredVoluneers={requiredVoluneers} />
      </div>
    </div>
  );
}

export default TaskHeader;
