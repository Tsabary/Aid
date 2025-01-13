"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

const MILES_TO_METERS = 1609.34;
const KM_TO_METERS = 1000;

// Fixed max radius in meters
const MAX_RADIUS_METERS = 500 * MILES_TO_METERS;

export default function RadiusSelectorContent({
  setIsDialogOpen,
  isKm: initialIsKm,
  radius: initialRadius,
  setIsKm,
  setRadius,
}: {
  setIsDialogOpen: (state: boolean) => void;
  isKm: boolean;
  radius: number; // in meters
  setIsKm: (state: boolean) => void;
  setRadius: React.Dispatch<React.SetStateAction<number>>;
}) {
  // Local states for editing
  const [localRadius, setLocalRadius] = useState(initialRadius);
  const [localIsKm, setLocalIsKm] = useState(initialIsKm);

  useEffect(() => {
    // Sync local state with props when they change
    setLocalRadius(initialRadius);
    setLocalIsKm(initialIsKm);
  }, [initialRadius, initialIsKm]);

  const handleRadiusChange = (value: number[]) => {
    // Update local radius directly in meters
    setLocalRadius(value[0]);
  };

  const handleUnitChange = (value: string) => {
    setLocalIsKm(value === "km");
  };

  const handleSave = () => {
    // Commit changes to parent states
    setRadius(localRadius);
    setIsKm(localIsKm);
    setIsDialogOpen(false);
  };

  const displayedRadius = localIsKm
    ? localRadius / KM_TO_METERS // Convert to kilometers for display
    : localRadius / MILES_TO_METERS; // Convert to miles for display

  return (
    <form className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="radius-slider">
          Radius: {Math.round(displayedRadius)} {localIsKm ? "km" : "miles"}
        </Label>
        <Slider
          id="radius-slider"
          min={KM_TO_METERS} // Minimum in meters (e.g., 1 km)
          max={MAX_RADIUS_METERS} // Maximum in meters (e.g., 500 miles)
          step={KM_TO_METERS} // Step in meters (e.g., 1 km)
          value={[localRadius]}
          onValueChange={handleRadiusChange}
        />
      </div>
      <Tabs value={localIsKm ? "km" : "miles"} onValueChange={handleUnitChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="miles">Miles</TabsTrigger>
          <TabsTrigger value="km">Kilometers</TabsTrigger>
        </TabsList>
      </Tabs>
      <Button type="button" onClick={handleSave} className="w-full">
        Save
      </Button>
    </form>
  );
}
