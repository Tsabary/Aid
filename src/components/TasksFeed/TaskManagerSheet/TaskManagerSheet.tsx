import { useState, useEffect } from "react";
import { useEntity, UserAvatar, useUser } from "replyke";

import TaskApplicants from "./TaskApplicants";
import TaskAssigned from "./TaskAssigned";
import TaskDismissed from "./TaskDismissed";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import TaskCommentSection from "./TaskCommentSection";

function TaskManagerSheet({
  isSheetOpen,
  setIsSheetOpen,
}: {
  isSheetOpen: boolean;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user } = useUser();
  const { entity: task } = useEntity();
  const [applicants, setApplicants] = useState<TaskApplication[]>([]);

  const offeredHelp: number =
    applicants.filter((app) => app.status === "new").length || 0;

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
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
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
            <TabsTrigger value="offered" className="text-xs">
              Offered ({offeredHelp})
            </TabsTrigger>
            <TabsTrigger value="assigned" className="text-xs">
              Assigned (
              {applicants.filter((app) => app.status === "assigned").length})
            </TabsTrigger>
            <TabsTrigger value="dismissed" className="text-xs">
              Dismissed (
              {applicants.filter((app) => app.status === "dismissed").length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="offered">
            <TaskApplicants
              applications={applicants.filter((app) => app.status === "new")}
              task={task}
            />
          </TabsContent>
          <TabsContent value="assigned">
            <TaskAssigned
              applications={applicants.filter(
                (app) => app.status === "assigned"
              )}
              task={task}
            />
          </TabsContent>
          <TabsContent value="dismissed">
            <TaskDismissed
              applications={applicants.filter(
                (app) => app.status === "dismissed"
              )}
              task={task}
            />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

export default TaskManagerSheet;
