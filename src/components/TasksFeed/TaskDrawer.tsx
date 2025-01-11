import { useState, useEffect } from "react";
import { useUser } from "replyke";
import { User, UserCheck, UserMinus } from "lucide-react";

import TaskDrawerHeader from "./TaskDrawerHeader";
import TaskApplicants from "./TaskApplicants";
import TaskAssigned from "./TaskAssigned";
import TaskDismissed from "./TaskDismissed";
import { Tabs } from "../ui/cusotm/Tabs";
import { Sheet, SheetContent } from "../ui/sheet";

// import TaskCommentSection from "./TaskCommentSection";

function TaskDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  selectedTask,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: Task | undefined;
}) {
  const { user } = useUser();

  const [task, setTask] = useState<Task>();
  const [applicants, setApplicants] = useState<TaskApplication[]>([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const offeredHelp: number =
    applicants.filter((app) => app.status === "new").length || 0;

  const tabs = [
    {
      title: `offered help (${offeredHelp})`,
      icon: (
        <User className={windowDimensions.width < 600 ? "size-0" : "size-5"} />
      ),
    },
    {
      title: `Assigned (${
        applicants.filter((app) => app.status === "assigned").length
      })`,
      icon: (
        <UserCheck
          className={windowDimensions.width < 600 ? "h-0 w-0" : "h-5 w-5"}
        />
      ),
    },
    {
      title: `Non relevant (${
        applicants.filter((app) => app.status === "dismissed").length
      })`,
      icon: (
        <UserMinus
          className={windowDimensions.width < 600 ? "h-0 w-0" : "h-5 w-5"}
        />
      ),
    },
  ];

  // Fetch applicants
  useEffect(() => {
    if (!task) return;
    let unsub: () => void;
    (async () => {
      try {
        if (!user) {
          throw new Error("Please authenticate first");
        }

        // const q = query(
        //   collection(firestore, getCollectionName("applications")),
        //   where("task_id", "==", task.id)
        // );

        // unsub = onSnapshot(
        //   q,
        //   (querySnapshot) => {
        //     const docs = querySnapshot.docs.map(
        //       (doc) =>
        //         ({
        //           ...doc.data(),
        //           id: doc.id,
        //         } as unknown as TaskApplication)
        //     );
        //     setApplicants(docs);
        //   },
        //   (e) => console.log("Applications snapshot failed: ", e)
        // );
      } catch (err: unknown) {
        console.log("Failed to fetch applications: ", err);
      }
    })();

    // return () => unsub && unsub();
  }, [task, user]);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // This useEffect listens to when we have the authenticated user information and then fetches our user profile object from our database
  // useEffect(() => {
  //   if (!user) return;
  //   if (!selectedTask) return;

  //   let unsub: () => void;
  //   (async () => {
  //     try {
  //       if (!firestore) {
  //         throw new Error("Firestore wasn't initialized properly");
  //       }
  //       unsub = onSnapshot(
  //         doc(firestore, getCollectionName("tasks"), selectedTask.id),
  //         (doc) => {
  //           const docData = doc.data();
  //           if (docData) {
  //             const t = {
  //               ...docData,
  //               id: doc.id,
  //             } as Task;

  //             setTask(t);
  //           } else {
  //             setTask(undefined);
  //           }
  //         },
  //         (e) => console.log("user snapshot failed: ", e)
  //       );
  //     } catch (err: unknown) {
  //       setTask(undefined);
  //       console.log("Fetching task failed: ", err);
  //     }
  //   })();

  //   return () => unsub && unsub();
  // }, [user, selectedTask, firestore]);

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <SheetContent className="flex flex-col">
        <TaskDrawerHeader task={task} />
        <div className="p-2">
          <Tabs
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            tabs={tabs}
          />
        </div>
        <div className="p-4">
          {currentTab === 0 && (
            <TaskApplicants
              applications={applicants.filter((app) => app.status === "new")}
              task={task}
            />
          )}
          {currentTab === 1 && (
            <TaskAssigned
              applications={applicants.filter(
                (app) => app.status === "assigned"
              )}
              task={task}
            />
          )}
          {currentTab === 2 && (
            <TaskDismissed
              applications={applicants.filter(
                (app) => app.status === "dismissed"
              )}
              task={task}
            />
          )}
        </div>
        {/* <TaskCommentSection task={selectedTask} /> */}
      </SheetContent>
    </Sheet>
  );
}

export default TaskDrawer;
