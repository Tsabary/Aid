import { UserAvatar } from "replyke";

function TaskDrawerHeader({ task }: { task?: Task }) {
  if (!task) return null;
  return (
    <div className="p-5 md:p-10 pb-5">
      <div className="flex items-center">
        <UserAvatar user={{ id: task.user.id, avatar: task.user.avatar }} />
        <p className="mx-3">{task.user.name}</p>
      </div>
      <h1 className="text-2xl my-4 font-semibold">{task.content}</h1>
    </div>
  );
}

export default TaskDrawerHeader;
