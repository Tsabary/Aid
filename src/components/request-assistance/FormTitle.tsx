import { Label } from "../ui/label";
import { Input } from "../ui/input";

function FormTitle({
  title,
  onChange,
  errors,
}: {
  title: string;
  onChange: (newContent: string) => void;
  errors: Record<"title" | "content" | "category", string | null>;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="task-title">
        <span className="text-red-500 mr-1">*</span>
        What Support Are You Looking For?
      </Label>
      <div>
        <Input
          id="task-title"
          placeholder="Tell us what you need assistance with"
          value={title}
          onChange={(e) => onChange(e.target.value)}
        />
        {errors["title"] && (
          <p className="text-xs text-red-500 mt-1">{errors["title"]}</p>
        )}
      </div>
    </div>
  );
}

export default FormTitle;
