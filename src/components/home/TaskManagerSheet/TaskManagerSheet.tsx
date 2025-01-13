import { useEntity, UserAvatar } from "replyke";

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
import { Task } from "../../../types/Task";

// import TaskCommentSection from "./TaskCommentSection";

function TaskManagerSheet({
  isSheetOpen,
  setIsSheetOpen,
}: {
  isSheetOpen: boolean;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { entity } = useEntity();
  const task = entity as Task;

  if (!task) return null;

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <div className="flex items-center">
            <UserAvatar
              user={{ id: task.user?.id, avatar: task.user?.avatar }}
            />
            <p className="mx-3 font-medium text-sm">{task.user?.name}</p>
          </div>
          <SheetTitle>{task.title}</SheetTitle>
          <SheetDescription>{task.content}</SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="offered" className="w-full flex-1 flex flex-col">
          <TabsList className="w-full justify-between">
            <TabsTrigger value="offered" className="text-xs">
              Offered ({task.metadata.applicants.length})
            </TabsTrigger>
            <TabsTrigger value="assigned" className="text-xs">
              Assigned ({task.metadata.assigned.length})
            </TabsTrigger>
            <TabsTrigger value="dismissed" className="text-xs">
              Dismissed ({task.metadata.dismissed.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="offered" className="flex-1">
            <TaskApplicants />
          </TabsContent>
          <TabsContent value="assigned" className="flex-1">
            <TaskAssigned />
          </TabsContent>
          <TabsContent value="dismissed" className="flex-1">
            <TaskDismissed />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

export default TaskManagerSheet;
