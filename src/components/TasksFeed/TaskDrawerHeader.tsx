import { UserAvatar } from "replyke";

function TaskDrawerHeader({ task }: { task?: Task }) {
  if (!task) return null;
  return (
    <div className="p-5 md:p-10 pb-5">
      <div className="flex items-center">
        <UserAvatar user={{ id: task.authorId, avatar: task.authorAvatar }} />
        <p className="mx-3">{task.authorName}</p>
      </div>
      <h1 className="text-2xl my-4 font-semibold">{task.description}</h1>
    </div>
  );
}

export default TaskDrawerHeader;
