import { MapPin, Radius } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  KM_TO_METERS,
  MILES_TO_METERS,
} from "../../constants/units-conversion";

function LocationFilters({
  setIsLocationDialogOpen,
  setIsRadiusDialogOpen,
  isKm,
  radius,
  location,
}: {
  setIsLocationDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRadiusDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isKm: boolean;
  radius: number;
  location: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  } | null;
}) {
  const displayedRadius = isKm
    ? radius / KM_TO_METERS // Convert to kilometers for display
    : radius / MILES_TO_METERS; // Convert to miles for display

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={() => setIsLocationDialogOpen(true)}
        className="gap-2 w-max text-xs text-gray-500 h-7 px-2 min-w-7"
      >
        <MapPin className="size-4" />
        {location ? location.name : "Set Location"}
      </Button>
      <Button
        variant="outline"
        onClick={() => setIsRadiusDialogOpen(true)}
        className="gap-2 w-max text-xs text-gray-500 h-7 px-2 min-w-7"
      >
        <Radius className="size-4" />
        {Math.round(displayedRadius)} {isKm ? "km" : "miles"}
      </Button>
    </div>
  );
}

export default LocationFilters;
