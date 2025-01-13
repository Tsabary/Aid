import React from "react";
import { TaskDraft } from "../../pages/RequestAssistancePage";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { helpCategories } from "@/constants/categories";

function FormCategories({
  newTask,
  setNewTask,
  errors,
}: {
  newTask: TaskDraft;
  setNewTask: React.Dispatch<React.SetStateAction<TaskDraft>>;
  errors: Record<"title" | "content" | "category", string | null>;
}) {
  return (
    <div className="flex flex-col gap-3 pt-2">
      <Label>
        <span className="text-red-500 mr-1">*</span>
        Choose the category that best fits your request
      </Label>

      <div>
        <ToggleGroup
          type="single"
          className="w-full flex flex-wrap justify-start gap-1.5"
          onValueChange={(v) => {
            setNewTask((nt) => ({
              ...nt,
              category: (v ?? null) as TaskCategory,
            }));
          }}
          value={newTask.category ?? undefined}
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
        {errors["category"] && (
          <p className="text-xs text-red-500 mt-2">{errors["category"]}</p>
        )}
      </div>
    </div>
  );
}

export default FormCategories;
