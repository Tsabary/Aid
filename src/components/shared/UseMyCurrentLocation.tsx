import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

function UseMyCurrentLocation({
  setLocation,
}: {
  setLocation: React.Dispatch<
    React.SetStateAction<{
      name: string;
      coordinates: { lat: number; lng: number };
    } | null>
  >;
}) {
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = {
          name: "Current Location",
          coordinates: {
            lat: latitude,
            lng: longitude,
          },
        };

        setLocation(location);
      },
      (error) => {
        console.error("Error fetching current location:", error);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Permission to access location was denied.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            alert("The request to get your location timed out.");
            break;
          default:
            alert("An unknown error occurred while fetching your location.");
        }
      }
    );
  };

  return (
    <Button
      onClick={handleUseCurrentLocation}
      className="w-full"
      variant="outline"
    >
      <MapPin className="mr-2 h-4 w-4" /> Use my current location
    </Button>
  );
}

export default UseMyCurrentLocation;
