import { useEffect, useRef, useState } from "react";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";
import { Task } from "../../../types/Task";
import { handleError, useEntity } from "replyke";
import { LoaderCircle } from "lucide-react";
import { cn } from "../../../lib/utils";

function EditTask() {
  const { entity, updateEntity } = useEntity();
  const [showEdit, setShowEdit] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  const handleSave = async () => {
    if (isSubmittingRef.current) return;

    if (!editedTask) return;

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    try {
      await updateEntity?.({
        update: {
          metadata: editedTask.metadata,
        },
      });
      setShowEdit(false);
    } catch (err: unknown) {
      handleError(err, "Failed to update task");
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (entity) setEditedTask(entity as Task);
  }, [entity]);

  if (!showEdit) {
    return (
      <div
        className="p-2 bg-blue-500 cursor-pointer"
        onClick={() => setShowEdit(true)}
      >
        <p className="text-center text-sm text-white">Edit your request</p>
      </div>
    );
  }

  if (!entity) return null;
  return (
    <div className="border-t border-gray-200">
      <div className="p-2 grid gap-2">
        <div className="flex items-center gap-2">
          <Checkbox
            id={"status" + entity.id}
            checked={editedTask?.metadata.isCompleted}
            onCheckedChange={(isChecked) => {
              setEditedTask((et) =>
                et
                  ? {
                      ...et,
                      metadata: {
                        ...et.metadata,
                        isCompleted: !!isChecked,
                      },
                    }
                  : et
              );
            }}
          />
          <Label htmlFor={"status" + entity.id} className="text-sm">
            Task completed
          </Label>
        </div>

        {editedTask?.metadata.isCompleted && (
          <p className="text-sm text-red-500 mr-2">
            New volunteers can't apply to complted tasks
          </p>
        )}

        <p
          onClick={() => {
            setEditedTask(entity as Task);
            setShowEdit(false);
          }}
          className="text-sm text-gray-500 text-center underline cursor-pointer"
        >
          Cancel
        </p>
      </div>
      <button
        className={cn(
          "p-2 bg-blue-500 cursor-pointer flex items-center justify-center w-full",
          isSubmitting && "opacity-70"
        )}
        onClick={handleSave}
        disabled={isSubmitting}
      >
        {isSubmitting && <LoaderCircle className="size-4 mr-2 animate-spin text-white" />}

        <p className="text-center text-sm text-white">Save Changes</p>
      </button>
    </div>
  );
}

export default EditTask;
