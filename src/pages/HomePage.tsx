import { useFeed } from "replyke";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { helpCategories } from "../constants/categories";
import TasksFeed from "../components/TasksFeed";
import { Task } from "../types/Task";
import { LocationSelectorDialog } from "../components/shared/LocationSelectorDialog";
import { useEffect, useState } from "react";
import { MapPin, Radius } from "lucide-react";
import { Button } from "../components/ui/button";
import { RadiusSelectorDialog } from "../components/shared/RadiusSelectorDialog";

const MILES_TO_METERS = 1609.34;
const KM_TO_METERS = 1000;

function HomePage() {
  const { entities, setLocationFilters, updateKeywordsFilters, kickstart } =
    useFeed();
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [isRadiusDialogOpen, setIsRadiusDialogOpen] = useState(false);

  const [categories, setCategories] = useState<string[]>([]);
  const [location, setLocation] = useState<{
    name: string;
    coordinates: { lat: number; lng: number };
  } | null>(null);

  const [radius, setRadius] = useState(10000);
  const [isKm, setIsKm] = useState(true);
  const displayedRadius = isKm
    ? radius / KM_TO_METERS // Convert to kilometers for display
    : radius / MILES_TO_METERS; // Convert to miles for display

  // const handleScroll = useCallback(async () => {
  //   try {
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //       if (!lastVisible) {
  //         throw new Error("Last visible wasn't set");
  //       }
  //       const newDocs = await fetchMoreDocuments(lastVisible);
  //       if (!newDocs) {
  //         throw new Error("Fetching new docs failed");
  //       }
  //       setTasks((ts) => (ts ? [...ts, ...newDocs] : ts));
  //       setLastVisible(newDocs[newDocs.length - 1]);
  //     }
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       console.log("Failed to fetch more documents", err.message);
  //     } else {
  //       console.log("Failed to fetch more documents", err);
  //     }
  //   }
  // }, [lastVisible, fetchMoreDocuments]);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [tasks, lastVisible, handleScroll]);

  // Save location locally whenever it changes
  useEffect(() => {
    if (location) {
      localStorage.setItem("location", JSON.stringify(location));
      setLocationFilters?.({
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng,
        radius: 10000,
      });
      kickstart?.();
    }
  }, [location]);

  // Load location on launch
  useEffect(() => {
    const savedLocation = localStorage.getItem("location");
    if (savedLocation) {
      setLocation(JSON.parse(savedLocation));
    } else {
      setIsLocationDialogOpen(true); // Open dialog if no saved location
    }
  }, []);

  useEffect(() => {
    updateKeywordsFilters?.("add", "includes", categories);
  }, [categories]);

  return (
    <>
      <LocationSelectorDialog
        isDialogOpen={isLocationDialogOpen}
        setIsDialogOpen={setIsLocationDialogOpen}
        setLocation={setLocation}
      />
      <RadiusSelectorDialog
        isDialogOpen={isRadiusDialogOpen}
        setIsDialogOpen={setIsRadiusDialogOpen}
        isKm={isKm}
        setIsKm={setIsKm}
        radius={radius}
        setRadius={setRadius}
      />
      <div className="w-full max-w-7xl grid gap-4">
        <h1 className="text-2xl font-bold mx-2 mb-4">How could you help?</h1>

        <ToggleGroup
          type="multiple"
          value={categories}
          onValueChange={setCategories}
          className="w-full flex flex-wrap justify-start gap-1.5"
        >
          {Object.keys(helpCategories).map((k) => (
            <ToggleGroupItem
              variant="outline"
              className="hover:bg-blue-50 text-xs"
              value={k}
              size="xs"
              id={k}
              key={k}
            >
              {helpCategories[k as TaskCategory]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsLocationDialogOpen(true)}
            className="gap-2 w-max text-xs text-gray-500 h-7 px-2 min-w-7"
          >
            <MapPin className="size-4" />
            {location?.name}
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

        {entities?.length ? (
          <TasksFeed
            tasks={(entities as Task[]).filter(
              (t) => t.metadata.status !== "completed"
            )}
          />
        ) : (
          <p className="text-2xl font-bold mt-4">Please expand your search</p>
        )}
      </div>
    </>
  );
}

export default HomePage;
