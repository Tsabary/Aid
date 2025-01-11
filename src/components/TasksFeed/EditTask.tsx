import { useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

function EditTask({
  task,
  setTask,
}: {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);

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

  if (!showEdit) {
    return (
      <div
        className="p-2 bg-blue-500 cursor-pointer"
        onClick={() => setShowEdit(true)}
      >
        <p className="text-center text-sm text-white">ערכו את הבקשה</p>
      </div>
    );
  }
  return (
    <div className="border-t border-gray-200">
      {/* <fieldset
        className="flex max-w-md flex-col gap-2 p-2"
        id={"radio" + task.id}
      >
        <div className="flex items-center gap-2">
          <Radio
            id={`open-${task.id}`}
            name="status"
            value="open"
            checked={editedTask.status === "open"}
            onChange={(e) => {
              if (!e.target.checked) return;
              setEditedTask((et) => ({ ...et, status: "open" }));
            }}
          />
          <Label htmlFor={`open-${task.id}`}>פתוח</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id={`in_progress-${task.id}`}
            name="status"
            value="in_progress"
            checked={editedTask.status === "in_progress"}
            onChange={(e) => {
              if (!e.target.checked) return;
              setEditedTask((et) => ({ ...et, status: "in_progress" }));
            }}
          />
          <Label htmlFor={`in_progress-${task.id}`}>בתהליך</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id={`completed-${task.id}`}
            name="status"
            value="completed"
            checked={editedTask.status === "completed"}
            onChange={(e) => {
              if (!e.target.checked) return;
              setEditedTask((et) => ({ ...et, status: "completed" }));
            }}
          />
          <Label htmlFor={`completed-${task.id}`}>הושלם</Label>
        </div>
      </fieldset> */}

      <div className="flex items-center gap-2 p-2">
        <Checkbox
          id={"status" + task.id}
          checked={editedTask.status === "completed"}
          onCheckedChange={(isChecked) => {
            let newStatus: TaskStatus = task.status;

            if (isChecked) {
              newStatus = "completed";
            }

            setEditedTask((et) => ({ ...et, status: newStatus }));
          }}
        />
        <Label htmlFor={"status" + task.id} className="text-sm">
          המשימה הושלמה
        </Label>
      </div>

      {editedTask.status === "completed" && (
        <p className="text-sm text-red-500 mr-2">
          סימון המשימה כשהושלמה תסתיר אותה ממתנדבים חדשים
        </p>
      )}

      <div className="flex items-center gap-2 p-2">
        <Checkbox
          id={"urgent" + task.id}
          checked={editedTask.urgent}
          onCheckedChange={(isChecked) =>
            setEditedTask((et) => ({ ...et, urgent: !!isChecked }))
          }
        />
        <Label htmlFor={"urgent" + task.id} className="text-sm">
          דחוף לרגע זה
        </Label>
      </div>

      <p
        onClick={() => setShowEdit(false)}
        className="text-sm text-gray-500 text-center underline cursor-pointer mb-2"
      >
        ביטול
      </p>

      <div className="p-2 bg-blue-500 cursor-pointer" onClick={handleSave}>
        <p className="text-center text-sm text-white">שמרו שינויים</p>
      </div>
    </div>
  );
}

export default EditTask;
