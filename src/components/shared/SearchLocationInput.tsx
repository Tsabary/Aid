import { Input } from "@/components/ui/input";

function SearchLocationInput({
  searchQuery,
  setSearchQuery,
  results,
  isDropdownOpen,
  setIsDropdownOpen,
  isSelecting,
  setResults,
  setLocation,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  results: PlacePrediction[];
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSelecting: React.MutableRefObject<boolean>;
  setResults: React.Dispatch<React.SetStateAction<PlacePrediction[]>>;
  setLocation: React.Dispatch<
    React.SetStateAction<{
      name: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    } | null>
  >;
}) {
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
        setSearchQuery(description);
        isSelecting.current = true;
        setResults([]);
        setIsDropdownOpen(false);
      } else {
        console.error("Error fetching location details:", status);
      }
    });
  };

  return (
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
  );
}

export default SearchLocationInput;
