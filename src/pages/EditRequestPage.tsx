import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { handleError, useEntityData, useUser } from "@replyke/react-js";
import { LoaderCircle } from "lucide-react";

import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import FormTitle from "../components/request-assistance/FormTitle";
import FormDescription from "../components/request-assistance/FormDescription";
import FormVolunteersRequired from "../components/request-assistance/FormVolunteersRequired";
import FormCategories from "../components/request-assistance/FormCategories";
import FormLocation from "../components/request-assistance/FormLocation";
import { LocationSelectorDialog } from "../components/shared/LocationSelectorDialog";
import { cn } from "../lib/utils";
import { Task } from "../types/Task";

export type TaskDraft = {
  title: string;
  content: string;
  volunteersRequired: number | null;
  category: TaskCategory | null;
};

function EditRequestPage() {
  const navigate = useNavigate();
  const { taskId: shortId } = useParams();
  const { entity, updateEntity } = useEntityData({ shortId });
  const task = entity as Task | undefined;
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
      await updateEntity({
        update: {
          title: newTask.title,
          content: newTask.content,
          keywords: [newTask.category],
          location: {
            latitude: location.coordinates.lat,
            longitude: location.coordinates.lng,
          },
          metadata: {
            volunteersRequired: newTask.volunteersRequired,
            locationName: location.name,
          },
        },
      });
      navigate("/");
    } catch (err) {
      handleError(err, "Failed to submit a new request");
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }, [updateEntity, newTask, location, navigate, user, setProfileDialogOpen]);

  useEffect(() => {
    if (!task || !task.location) return;

    setNewTask({
      title: task.title || "",
      content: task.content || "",
      volunteersRequired: task.metadata.volunteersRequired,
      category: task.keywords[0] as TaskCategory,
    });

    setLocation({
      name: task.metadata.locationName,
      coordinates: {
        lng: task.location.coordinates[0],
        lat: task.location.coordinates[1],
      },
    });
  }, [task]);

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
        <FormTitle
          title={newTask.title}
          onChange={(newValue) => {
            setNewTask((nt) => ({ ...nt, title: newValue }));
          }}
          errors={errors}
        />

        {/* description */}
        <FormDescription
          content={newTask.content}
          onChange={(newValue) => {
            setNewTask((nt) => ({ ...nt, content: newValue }));
          }}
          errors={errors}
        />

        <Separator />

        {/* How many people */}
        <FormVolunteersRequired
          volunteersRequired={newTask.volunteersRequired}
          onChange={(newValue) => {
            setNewTask((nt) => ({
              ...nt,
              volunteersRequired: newValue,
            }));
          }}
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
          category={newTask.category}
          onChange={(newValue) => {
            setNewTask((nt) => ({
              ...nt,
              category: newValue,
            }));
          }}
          errors={errors}
        />

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={cn("w-max", isSubmitting && "opacity-70")}
        >
          {isSubmitting && (
            <LoaderCircle className="size-4 mr-2 animate-spin" />
          )}
          Update Request
        </Button>
      </div>
    </>
  );
}

export default EditRequestPage;
