import React from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

function FormVolunteersRequired({
  volunteersRequired,
  onChange,
}: {
  volunteersRequired: number | null;
  onChange: (newValue: number | null) => void;
  errors: Record<"title" | "content" | "category", string | null>;
}) {
  const handleCheckboxChange = (checked: boolean) => {
    onChange(checked ? null : 1);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    onChange(newValue >= 1 && newValue <= 99 ? newValue : 1);
  };

  return (
    <div className="flex flex-col gap-3 pt-2">
      <Label>
        <span className="text-red-500 mr-1">*</span>
        How many volunteers are needed?
      </Label>
      <div className="flex gap-2 min-h-8">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="unlimited"
            checked={volunteersRequired === null}
            onCheckedChange={handleCheckboxChange}
          />
          <Label
            htmlFor="unlimited"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Unlimited
          </Label>
        </div>
        {volunteersRequired && (
          <Input
            type="number"
            id="requiredVolunteersPicker"
            min={1}
            max={99}
            value={volunteersRequired === null ? "" : volunteersRequired}
            onChange={handleNumberChange}
            disabled={volunteersRequired === null}
            className="w-14 h-8 px-2"
          />
        )}
      </div>
    </div>
  );
}

export default FormVolunteersRequired;
