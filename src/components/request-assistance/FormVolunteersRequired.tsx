import React from "react";
import { TaskDraft } from "../../pages/RequestAssistancePage";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

function FormVolunteersRequired({
  newTask,
  setNewTask,
}: {
  newTask: TaskDraft;
  setNewTask: React.Dispatch<React.SetStateAction<TaskDraft>>;
  errors: Record<"title" | "content" | "category", string | null>;
}) {
  const handleCheckboxChange = (checked: boolean) => {
    setNewTask((nt) => ({
      ...nt,
      volunteersRequired: checked ? null : 1,
    }));
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setNewTask((nt) => ({
      ...nt,
      volunteersRequired: newValue >= 1 && newValue <= 99 ? newValue : 1,
    }));
  };

  return (
    <div className="flex flex-col gap-3 pt-2">
      <Label>
        <span className="text-red-500 mr-1">*</span>
        How many volunteers are needed?
      </Label>
      <div className="flex gap-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="unlimited"
            checked={newTask.volunteersRequired === null}
            onCheckedChange={handleCheckboxChange}
          />
          <Label
            htmlFor="unlimited"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Unlimited
          </Label>
        </div>
        <Input
          type="number"
          id="requiredVolunteersPicker"
          min={1}
          max={99}
          value={
            newTask.volunteersRequired === null
              ? ""
              : newTask.volunteersRequired
          }
          onChange={handleNumberChange}
          disabled={newTask.volunteersRequired === null}
          className="w-14 h-8 px-2"
        />
      </div>
    </div>
  );
}

export default FormVolunteersRequired;
