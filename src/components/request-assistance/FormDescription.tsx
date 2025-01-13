import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

function FormDescription({
  content,
  onChange,
  errors,
}: {
  content: string;
  onChange: (newContent: string) => void;
  errors: Record<"title" | "content" | "category", string | null>;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="task-content">
        <span className="text-red-500 mr-1">*</span>
        Can you expand on that?
      </Label>
      <div>
        <Textarea
          id="task-content"
          placeholder="Add more details to help us help you"
          value={content}
          onChange={(e) => onChange(e.target.value)}
        />
        {errors["content"] && (
          <p className="text-xs text-red-500 mt-1">{errors["content"]}</p>
        )}
      </div>
    </div>
  );
}

export default FormDescription;
