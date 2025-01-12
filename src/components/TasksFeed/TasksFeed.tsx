import { useState } from "react";
import { Entity, EntityProvider, useUser } from "replyke";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Measure from "react-measure";

import TaskCard from "./TaskCard";
import { TaskManagerSheet } from "./TaskManagerSheet";
import { Task } from "../../types/Task";

function TasksFeed({ tasks }: { tasks: Task[] }) {
  const { user } = useUser();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();

  return (
    <>
      <EntityProvider entity={selectedTask as unknown as Entity}>
        <TaskManagerSheet
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
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
                      handleOpenDrawer={() => {
                        if (user && user.id === task.user?.id) {
                          setSelectedTask(task);
                          setIsDrawerOpen(true);
                        }
                      }}
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
