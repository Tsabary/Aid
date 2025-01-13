import { useEffect, useState } from "react";
import { Entity, EntityProvider, useFeed } from "replyke";
import Measure from "react-measure";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useParams } from "react-router-dom";
import DiscussionSheet from "../components/home/DiscussionSheet";
import { Task } from "../types/Task";
import { TaskCard } from "../components/home/TasksFeed/TaskCard";

function Profile() {
  const { profileId } = useParams();

  const { entities, setUserId, setLocationFilters, kickstart } = useFeed();
  const tasks = entities as Task[];
  const [isDiscussionSheetOpen, setIsDiscussionSheetOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();

  const handleOpenDiscussionSheet = (task: Task) => {
    setSelectedTask(task);
    setIsDiscussionSheetOpen(true);
  };

  useEffect(() => {
    if (!profileId) return;
    setUserId?.(profileId);
    setLocationFilters?.(null);
    kickstart?.();
  }, [profileId]);

  return (
    <div className="w-full max-w-7xl grid gap-4">
      <h1 className="text-2xl font-bold mx-2 mb-4">My requests</h1>

      <EntityProvider entity={selectedTask as unknown as Entity}>
        <DiscussionSheet
          isSheetOpen={isDiscussionSheetOpen}
          setIsSheetOpen={setIsDiscussionSheetOpen}
        />
      </EntityProvider>

      <ResponsiveMasonry
        columnsCountBreakPoints={{
          300: 1,
          500: 2,
          800: 3,
          1100: 4,
          // 1300: 5,
        }}
      >
        <Masonry gutter="24px">
          {tasks.map((task, i) => (
            <Measure key={i}>
              {({ measureRef }) => (
                <div ref={measureRef} key={task.id}>
                  <EntityProvider entity={task}>
                    <TaskCard
                      isKm={true}
                      location={null}
                      handleOpenDiscussionSheet={(passedTask) =>
                        handleOpenDiscussionSheet(passedTask)
                      }
                    />
                  </EntityProvider>
                </div>
              )}
            </Measure>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export default Profile;
