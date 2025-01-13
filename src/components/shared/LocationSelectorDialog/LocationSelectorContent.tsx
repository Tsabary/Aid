import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useDebounce } from "../../../hooks/useDebounce";

interface PlacePrediction {
  description: string;
  place_id: string;
}

function LocationSelectorContent({
  setLocation,
}: {
  setLocation: React.Dispatch<
    React.SetStateAction<{
      name: string;
      coordinates: { lat: number; lng: number };
    } | null>
  >;
}) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<PlacePrediction[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isSelecting = useRef<boolean>(false); // New flag to track selection

  const handleSelectAddress = (placeId: string, description: string) => {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ placeId }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results?.[0]) {
        const location = {
          name: description,
          coordinates: {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          },
        };
        setLocation(location);

        // Prevent dropdown reopening
        isSelecting.current = true;

        setResults([]); // Clear results
        setIsDropdownOpen(false); // Close the dropdown
      } else {
        console.error("Error fetching location details:", status);
      }
    });
  };

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
        setResults([]);
        setIsDropdownOpen(false);
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

  useEffect(() => {
    if (isSelecting.current) {
      // Prevent reopening the dropdown after a selection
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
      <Button
        onClick={handleUseCurrentLocation}
        className="w-full"
        variant="outline"
      >
        <MapPin className="mr-2 h-4 w-4" /> Use my current location
      </Button>
      <div className="flex items-center gap-3">
        <div className="flex-1 border-t" />
        <div className="text-center text-gray-400 text-sm">or</div>
        <div className="flex-1 border-t" />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for an address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-autocomplete="list"
          aria-controls="address-list"
          aria-expanded={isDropdownOpen}
        />
        {isDropdownOpen && results.length > 0 && (
          <ul
            id="address-list"
            className="absolute z-10 w-full mt-1 py-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
            role="listbox"
          >
            {results.map((result) => (
              <li
                key={result.place_id}
                className="px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() =>
                  handleSelectAddress(result.place_id, result.description)
                }
                role="option"
              >
                {result.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default LocationSelectorContent;
