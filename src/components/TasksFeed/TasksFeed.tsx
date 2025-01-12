import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Measure from "react-measure";

import TaskCard from "./TaskCard";
import TaskDrawer from "./TaskDrawer";
// import { generateTask } from "../../fixtures/taskFixture";

function TasksFeed({ tasks }: { tasks: Task[] }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();

  // console.log(ts.length);
  // const tasks: Task[] = Array.from({ length: 20 }, generateTask);

  const handleOpenDrawer = async (task: Task) => {
    try {
      setSelectedTask(task);
      setIsDrawerOpen(true);
    } catch (err: unknown) {
      console.log("Failed to open drawer: ", err);
    }
  };

  return (
    <>
      <TaskDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        selectedTask={selectedTask}
      />
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
                <div ref={measureRef}>
                  <TaskCard
                    task={task}
                    handleOpenDrawer={() => handleOpenDrawer(task)}
                    key={task.id}
                  />
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
