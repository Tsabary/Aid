import { useCallback, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { handleError, useCreateEntity, useUser } from "replyke";
import { LoaderCircle } from "lucide-react";

import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";
import { helpCategories } from "../constants/categories";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Separator } from "../components/ui/separator";

type TaskDraft = {
  title: string;
  content: string;
  volunteersRequired: number | null;
  category: TaskCategory | null;
};

function FindHelpPage() {
  const navigate = useNavigate();
  const createEntity = useCreateEntity();
  const { user } = useUser();
  const { setProfileDialogOpen } = useOutletContext<{
    setProfileDialogOpen: (state: boolean) => void;
  }>();

  const [newTask, setNewTask] = useState<TaskDraft>({
    title: "",
    content: "",
    volunteersRequired: 1,
    category: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const [errors, setErrors] = useState<
    Record<"title" | "content" | "category", string | null>
  >({ title: null, content: null, category: null });

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

  const handleSubmit = useCallback(async () => {
    if (isSubmittingRef.current) return;
    const remainingSteps =
      (user?.name ? 0 : 1) +
      (user?.metadata.phoneNumber || user?.metadata.email ? 0 : 1);

    if (remainingSteps > 0) {
      setProfileDialogOpen(true);
      return;
    }
    if (!newTask.title) {
      setErrors({
        title: "Please tell us how we can help.",
        content: null,
        category: null,
      });
      return;
    }

    if (newTask.title.length < 20) {
      setErrors({
        title: "Title is too short",
        content: null,
        category: null,
      });
      return;
    }

    if (!newTask.content) {
      setErrors({
        title: null,
        content: "Please describe what you need help with.",
        category: null,
      });
      return;
    }

    if (newTask.content.length < 50) {
      setErrors({
        title: null,
        content: "Please eloberate on your request a bit more.",
        category: null,
      });
      return;
    }

    if (!newTask.category) {
      setErrors({
        title: null,
        content: null,
        category: "Please select a category for your request.",
      });
      return;
    }
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    try {
      await createEntity({
        title: newTask.title,
        content: newTask.content,
        keywords: [newTask.category],
        metadata: {
          volunteersRequired: newTask.volunteersRequired,
          volunteersAssigned: 0,
        },
      });
      navigate("/");
    } catch (err) {
      handleError(err, "Failed to submit a new request");
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }, [createEntity, newTask, navigate, user, setProfileDialogOpen]);

  return (
    <div className="w-full max-w-7xl grid gap-4">
      <h1 className="text-2xl font-bold mx-2 mb-4">How could we help?</h1>

      {/* title */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="task-title">
          <span className="text-red-500 mr-1">*</span>
          What Support Are You Looking For?
        </Label>
        <div>
          <Input
            id="task-title"
            placeholder="Tell us what you need assistance with"
            value={newTask.title || ""}
            onChange={(e) =>
              setNewTask((nt) => ({ ...nt, title: e.target.value }))
            }
          />
          {errors["title"] && (
            <p className="text-xs text-red-500 mt-1">{errors["title"]}</p>
          )}
        </div>
      </div>

      {/* description */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="task-content">
          <span className="text-red-500 mr-1">*</span>
          Can you expand on that?
        </Label>
        <div>
          <Textarea
            id="task-content"
            placeholder="Add more details to help us help you"
            value={newTask.content || ""}
            onChange={(e) =>
              setNewTask((nt) => ({ ...nt, content: e.target.value }))
            }
          />
          {errors["content"] && (
            <p className="text-xs text-red-500 mt-1">{errors["content"]}</p>
          )}
        </div>
      </div>

      <Separator />

      {/* How many people */}
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

      <Separator />

      {/* Category */}
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

      <Button onClick={handleSubmit} disabled={isSubmitting} className="w-max">
        {isSubmitting && <LoaderCircle className="size-4 mr-2 animate-spin" />}
        Publish Request
      </Button>
    </div>
  );
}

export default FindHelpPage;
