import { useState } from "react";
import { Entity, EntityProvider, useUser } from "replyke";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Measure from "react-measure";

import { TaskCard } from "./TaskCard";
import { TaskManagerSheet } from "./TaskManagerSheet";
import { Task } from "../../types/Task";
import DiscussionSheet from "./DiscussionSheet/DiscussionSheet";

function TasksFeed({ tasks }: { tasks: Task[] }) {
  const { user } = useUser();
  const [isManagerSheetOpen, setIsManagerSheetOpen] = useState(false);
  const [isDiscussionSheetOpen, setIsDiscussionSheetOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();

  const handleOpenManagerSheet = (task: Task) => {
    if (user && user.id === task.user?.id) {
      setSelectedTask(task);
      setIsManagerSheetOpen(true);
    }
  };

  const handleOpenDiscussionSheet = (task: Task) => {
    setSelectedTask(task);
    setIsDiscussionSheetOpen(true);
  };

  return (
    <>
      <EntityProvider entity={selectedTask as unknown as Entity}>
        <TaskManagerSheet
          isSheetOpen={isManagerSheetOpen}
          setIsSheetOpen={setIsManagerSheetOpen}
        />
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
                      handleOpenManagerSheet={() =>
                        handleOpenManagerSheet(task)
                      }
                      handleOpenDiscussionSheet={() =>
                        handleOpenDiscussionSheet(task)
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
