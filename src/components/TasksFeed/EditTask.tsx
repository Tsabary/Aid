import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Task } from "../../types/Task";
import { useEntity } from "replyke";

function EditTask() {
  const { entity } = useEntity();
  const [showEdit, setShowEdit] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>();

  const handleSave = async () => {
    // try {
    //   const taskRef = doc(firestore, getCollectionName("tasks"), task.id);
    //   await updateDoc(taskRef, {
    //     status: editedTask.status,
    //     urgent: editedTask.urgent,
    //   });
    //   setShowEdit(false);
    //   setTask(editedTask);
    // } catch (err: unknown) {
    //   let message = "Failed to update task";
    //   if (err instanceof Error) {
    //     message = "Failed to update task: " + err.message;
    //   }
    //   console.log(message);
    // }
  };

  useEffect(() => {
    console.log({ entity });
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
          onClick={() => setShowEdit(false)}
          className="text-sm text-gray-500 text-center underline cursor-pointer"
        >
          Cancel
        </p>
      </div>
      <div className="p-2 bg-blue-500 cursor-pointer" onClick={handleSave}>
        <p className="text-center text-sm text-white">Save Changes</p>
      </div>
    </div>
  );
}

export default EditTask;
