import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { helpCategories } from "../../constants/categories";

function CategoryFilters({
  categories,
  setCategories,
}: {
  categories: TaskCategory[];
  setCategories: React.Dispatch<React.SetStateAction<TaskCategory[]>>;
}) {
  return (
    <ToggleGroup
      type="multiple"
      value={categories}
      onValueChange={(nv) => setCategories(nv as TaskCategory[])}
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
  );
}

export default CategoryFilters;
