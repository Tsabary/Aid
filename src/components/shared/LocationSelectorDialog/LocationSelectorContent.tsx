import { useState, useEffect, useRef } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import UseMyCurrentLocation from "./UseMyCurrentLocation";
import SearchLocationInput from "./SearchLocationInput";

// Part 1: Content Component
function LocationSelectorContent({
  setLocation,
  closeDialog,
}: {
  setLocation: React.Dispatch<
    React.SetStateAction<{
      name: string;
      coordinates: { lat: number; lng: number };
    } | null>
  >;
  closeDialog: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<PlacePrediction[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isSelecting = useRef<boolean>(false);

  useEffect(() => {
    if (isSelecting.current) {
      isSelecting.current = false;
      return;
    }

    if (debouncedSearchQuery.length >= 3) {
      const autocompleteService = new google.maps.places.AutocompleteService();

      autocompleteService.getPlacePredictions(
        { input: debouncedSearchQuery, types: ["geocode"] },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setResults(predictions);
            setIsDropdownOpen(true);
          } else {
            setResults([]);
            setIsDropdownOpen(false);
          }
        }
      );
    } else {
      setResults([]);
      setIsDropdownOpen(false);
    }
  }, [debouncedSearchQuery]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="p-4 space-y-1" ref={dropdownRef}>
      <UseMyCurrentLocation
        setLocation={setLocation}
        closeDialog={closeDialog}
      />
      <div className="flex items-center gap-3">
        <div className="flex-1 border-t" />
        <div className="text-center text-gray-400 text-sm">or</div>
        <div className="flex-1 border-t" />
      </div>
      <SearchLocationInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        results={results}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        isSelecting={isSelecting}
        setResults={setResults}
        setLocation={setLocation}
        closeDialog={closeDialog}
      />
    </div>
  );
}

export default LocationSelectorContent;
