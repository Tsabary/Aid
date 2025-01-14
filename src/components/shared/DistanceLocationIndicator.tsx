import { Task } from "../../types/Task";
import { MapPin } from "lucide-react";

function DistanceLocationIndicator({
  distance,
  task,
  isKm,
}: {
  distance?: number | null;
  task: Task;
  isKm: boolean;
}) {
  return (
    <div className="flex gap-1 items-center text-xs text-gray-500 overflow-hidden">
      <div>
        {distance
          ? `${distance.toFixed(1)} ${isKm ? "km" : " miles"} `
          : task.metadata.locationName.length > 12
          ? `${task.metadata.locationName.slice(0, 10)}..`
          : task.metadata.locationName}
      </div>
      <MapPin className="size-3" />
    </div>
  );
}

export default DistanceLocationIndicator;
