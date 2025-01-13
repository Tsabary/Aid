import { useCallback, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { handleError, useCreateEntity, useUser } from "replyke";
import { LoaderCircle } from "lucide-react";

import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import FormTitle from "../components/request-assistance/FormTitle";
import FormDescription from "../components/request-assistance/FormDescription";
import FormVolunteersRequired from "../components/request-assistance/FormVolunteersRequired";
import FormCategories from "../components/request-assistance/FormCategories";
import FormLocation from "../components/request-assistance/FormLocation";
import { LocationSelectorDialog } from "../components/shared/LocationSelectorDialog";

export type TaskDraft = {
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

  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [location, setLocation] = useState<{
    name: string;
    coordinates: { lat: number; lng: number };
  } | null>(null);
  const [newTask, setNewTask] = useState<TaskDraft>({
    title: "",
    content: "",
    volunteersRequired: 1,
    category: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  const [errors, setErrors] = useState<
    Record<"title" | "content" | "category" | "location", string | null>
  >({ title: null, content: null, category: null, location: null });

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
        location: null,
      });
      return;
    }

    if (newTask.title.length < 20) {
      setErrors({
        title: "Title is too short",
        content: null,
        category: null,
        location: null,
      });
      return;
    }

    if (!newTask.content) {
      setErrors({
        title: null,
        content: "Please describe what you need help with.",
        category: null,
        location: null,
      });
      return;
    }

    if (newTask.content.length < 50) {
      setErrors({
        title: null,
        content: "Please eloberate on your request a bit more.",
        category: null,
        location: null,
      });
      return;
    }

    if (!location) {
      setErrors({
        title: null,
        content: null,
        category: null,
        location: "Please select a location for your request",
      });
      return;
    }

    if (!newTask.category) {
      setErrors({
        title: null,
        content: null,
        category: "Please select a category for your request.",
        location: null,
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
        location: {
          latitude: location.coordinates.lat,
          longitude: location.coordinates.lng,
        },
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
  }, [createEntity, newTask, location, navigate, user, setProfileDialogOpen]);

  return (
    <>
      <LocationSelectorDialog
        isDialogOpen={isLocationDialogOpen}
        setIsDialogOpen={setIsLocationDialogOpen}
        setLocation={setLocation}
      />
      <div className="w-full max-w-7xl grid gap-6">
        <h1 className="text-2xl font-bold mx-2 mb-4">How could we help?</h1>

        {/* title */}
        <FormTitle newTask={newTask} setNewTask={setNewTask} errors={errors} />

        {/* description */}
        <FormDescription
          newTask={newTask}
          setNewTask={setNewTask}
          errors={errors}
        />

        <Separator />

        {/* How many people */}
        <FormVolunteersRequired
          newTask={newTask}
          setNewTask={setNewTask}
          errors={errors}
        />

        <Separator />

        <FormLocation
          location={location}
          setIsLocationDialogOpen={setIsLocationDialogOpen}
          errors={errors}
        />
        <Separator />

        {/* Category */}
        <FormCategories
          newTask={newTask}
          setNewTask={setNewTask}
          errors={errors}
        />

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-max"
        >
          {isSubmitting && (
            <LoaderCircle className="size-4 mr-2 animate-spin" />
          )}
          Publish Request
        </Button>
      </div>
    </>
  );
}

export default FindHelpPage;
