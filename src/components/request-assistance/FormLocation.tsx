import { Button } from "../ui/button";
import { MapPin } from "lucide-react";
import { Label } from "../ui/label";

function FormLocation({
  location,
  setIsLocationDialogOpen,
}: {
  location: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  } | null;
  setIsLocationDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="task-location">
        <span className="text-red-500 mr-1">*</span>
        Where will the help be needed?
      </Label>
      <Button
        id="task-location"
        variant="outline"
        onClick={() => setIsLocationDialogOpen(true)}
        className="gap-2 w-max text-xs text-gray-500 h-7 px-2 min-w-7"
      >
        <MapPin className="size-4" />
        {location ? location.name : "Choose location"}
      </Button>
    </div>
  );
}

export default FormLocation;
