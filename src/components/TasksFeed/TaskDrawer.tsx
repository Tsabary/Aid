import { useState, useEffect } from "react";
import { useEntity, UserAvatar, useUser } from "replyke";
import { User, UserCheck, UserMinus } from "lucide-react";

import TaskDrawerHeader from "./TaskDrawerHeader";
import TaskApplicants from "./TaskApplicants";
import TaskAssigned from "./TaskAssigned";
import TaskDismissed from "./TaskDismissed";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import TaskCommentSection from "./TaskCommentSection";

function TaskDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user } = useUser();
  const { entity: task } = useEntity();
  const [applicants, setApplicants] = useState<TaskApplication[]>([]);
  const [currentTab, setCurrentTab] = useState(0);

  const offeredHelp: number =
    applicants.filter((app) => app.status === "new").length || 0;

  useEffect(() => {
    console.log({ task });
  }, [task]);

  // Fetch applicants
  // useEffect(() => {
  //   if (!task) return;
  //   let unsub: () => void;
  //   (async () => {
  //     try {
  //       if (!user) {
  //         throw new Error("Please authenticate first");
  //       }

  //       // const q = query(
  //       //   collection(firestore, getCollectionName("applications")),
  //       //   where("task_id", "==", task.id)
  //       // );

  //       // unsub = onSnapshot(
  //       //   q,
  //       //   (querySnapshot) => {
  //       //     const docs = querySnapshot.docs.map(
  //       //       (doc) =>
  //       //         ({
  //       //           ...doc.data(),
  //       //           id: doc.id,
  //       //         } as unknown as TaskApplication)
  //       //     );
  //       //     setApplicants(docs);
  //       //   },
  //       //   (e) => console.log("Applications snapshot failed: ", e)
  //       // );
  //     } catch (err: unknown) {
  //       console.log("Failed to fetch applications: ", err);
  //     }
  //   })();

  //   // return () => unsub && unsub();
  // }, [task, user]);

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
        <SheetHeader>
          <div className="flex items-center">
            <UserAvatar
              user={{ id: task?.user?.id, avatar: task?.user?.avatar }}
            />
            <p className="mx-3 font-medium text-sm">{task?.user?.name}</p>
          </div>
          <SheetTitle>{task?.title}</SheetTitle>
          <SheetDescription>{task?.content}</SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="offered" className="w-full">
          <TabsList className="w-full justify-between">
            <TabsTrigger value="offered">{`Offered (${offeredHelp})`}</TabsTrigger>
            <TabsTrigger value="assigned">{`Assigned (${
              applicants.filter((app) => app.status === "assigned").length
            })`}</TabsTrigger>
            <TabsTrigger value="dismissed">{`Dismissed (${
              applicants.filter((app) => app.status === "dismissed").length
            })`}</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );

  // return (
  //   <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
  //     <SheetContent className="flex flex-col p-0">
  //       <TaskDrawerHeader task={task} />
  //       <div className="p-2">
  //         <Tabs
  //           currentTab={currentTab}
  //           setCurrentTab={setCurrentTab}
  //           tabs={tabs}
  //         />
  //       </div>
  //       <div className="p-4">
  //         {currentTab === 0 && (
  //           <TaskApplicants
  //             applications={applicants.filter((app) => app.status === "new")}
  //             task={task}
  //           />
  //         )}
  //         {currentTab === 1 && (
  //           <TaskAssigned
  //             applications={applicants.filter(
  //               (app) => app.status === "assigned"
  //             )}
  //             task={task}
  //           />
  //         )}
  //         {currentTab === 2 && (
  //           <TaskDismissed
  //             applications={applicants.filter(
  //               (app) => app.status === "dismissed"
  //             )}
  //             task={task}
  //           />
  //         )}
  //       </div>
  //       {/* <TaskCommentSection task={selectedTask} /> */}
  //     </SheetContent>
  //   </Sheet>
  // );
}

export default TaskDrawer;
