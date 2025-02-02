import { useState } from "react";
import { Entity, EntityProvider, useFeed } from "@replyke/react-js";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Measure from "react-measure";

import { TaskCard } from "./TaskCard";
import { Task } from "../../../types/Task";
import DiscussionSheet from "../../shared/DiscussionSheet";

function TasksFeed({
  isKm,
  location,
}: {
  isKm: boolean;
  location: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  } | null;
}) {
  const { entities } = useFeed();
  const tasks = entities as Task[];
  const [isDiscussionSheetOpen, setIsDiscussionSheetOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();

  const handleOpenDiscussionSheet = (task: Task) => {
    setSelectedTask(task);
    setIsDiscussionSheetOpen(true);
  };

  if (!location)
    return (
      <p className="text-2xl font-bold mt-4 text-center">
        To view requests - set your location
      </p>
    );

  if ((tasks || []).length === 0)
    return (
      <p className="text-3xl font-medium m-10 text-center text-gray-300">
        Please expand your search
      </p>
    );

  return (
    <>
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
                      isKm={isKm}
                      location={location}
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
    </>
  );
}

export default TasksFeed;
