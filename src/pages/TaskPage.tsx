import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { EntityProvider, useEntity } from "@replyke/react-js";
import { UserAvatar } from "@replyke/ui-core-react-js";

import { Task } from "../types/Task";
import { helpCategories } from "../constants/categories";
import RequiredVolunteersIndicator from "../components/shared/RequiredVolunteersIndicator";
import DistanceLocationIndicator from "../components/shared/DistanceLocationIndicator";
import { Button } from "../components/ui/button";
import DiscussionSheet from "../components/shared/DiscussionSheet";

function TaskPage() {
  const [searchParams] = useSearchParams();
  const { entity } = useEntity();
  const task = entity as Task;
  const [isDiscussionSheetOpen, setIsDiscussionSheetOpen] = useState(false);

  const requiredVoluneers = task?.metadata.volunteersRequired;

  useEffect(() => {
    if (searchParams.get("commentId")) {
      setIsDiscussionSheetOpen(true);
    }
  }, [searchParams]);
  if (!task) return null;
  return (
    <>
      <DiscussionSheet
        isSheetOpen={isDiscussionSheetOpen}
        setIsSheetOpen={setIsDiscussionSheetOpen}
      />
      <div className="w-full max-w-xl">
        <div className="grid gap-2 p-2 bg-blue-50 rounded-t-md">
          {/* First header line */}
          <div className="flex gap-2 justify-between">
            <div className="rounded-md px-2 py-0.5 bg-blue-200 text-xs text-gray-500 w-max">
              {helpCategories[task.keywords[0] as TaskCategory]}
            </div>
            <DistanceLocationIndicator task={task} isKm={false} />
          </div>

          {/* Second header line */}
          <div className="flex items-center">
            <div className="flex flex-1 items-center gap-2">
              <UserAvatar
                size={24}
                user={{ id: task.user?.id, avatar: task.user?.avatar }}
              />
              <p className="text-sm font-semibold text-gray-700">
                {task.user?.name?.split(" ")[0]}
              </p>
            </div>
            <RequiredVolunteersIndicator
              requiredVoluneers={requiredVoluneers}
            />
          </div>
        </div>

        {/* Body */}
        <div className="p-4 grid gap-2 border border-t-0 rounded-b-md">
          <p className="font-semibold text-sm">{task?.title}</p>
          <p className="text-sm text-gray-600">{task?.content}</p>
          <Button
            variant="outline"
            onClick={() => {
              setIsDiscussionSheetOpen(true);
            }}
            className="text-xs text-start w-max h-7 mt-2"
          >
            Discussion {task?.repliesCount ? `(${task.repliesCount})` : ""}
          </Button>
        </div>
      </div>
    </>
  );
}

const WrappedTaskPage = () => {
  const { taskId: shortId } = useParams();

  return (
    <EntityProvider shortId={shortId}>
      <TaskPage />
    </EntityProvider>
  );
};

export default WrappedTaskPage;
