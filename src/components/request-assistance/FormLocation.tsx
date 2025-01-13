import { Button } from "../ui/button";
import { MapPin } from "lucide-react";
import { Label } from "../ui/label";

function FormLocation({
  location,
  setIsLocationDialogOpen,
  errors,
}: {
  location: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  } | null;
  setIsLocationDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  errors: Record<"title" | "content" | "category" | "location", string | null>;
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
      {errors["location"] && (
        <p className="text-xs text-red-500 mt-1">{errors["location"]}</p>
      )}
    </div>
  );
}

export default FormLocation;
