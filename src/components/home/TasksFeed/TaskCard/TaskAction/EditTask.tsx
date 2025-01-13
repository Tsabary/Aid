import { useNavigate } from "react-router-dom";
import { useEntity, useUser } from "replyke";
import { Task } from "../../../../../types/Task";

function EditTask() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { entity } = useEntity();
  const task = entity as Task;

  if (!entity) return null;
  return (
    <button
      className="p-2 bg-blue-500 cursor-pointer text-center text-sm text-white w-full"
      onClick={(e) => {
        e.stopPropagation();
        if (!user || user.id !== task.user?.id) return;
        navigate("/task/" + task.shortId + "/edit");
      }}
    >
      Edit your request
    </button>
  );
}

export default EditTask;
