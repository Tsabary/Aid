import React from "react";
import {
  SocialStyleCallbacks,
  useEntity,
  UserAvatar,
  useSocialComments,
  useSocialStyle,
} from "replyke";
import { useSearchParams } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Task } from "../../types/Task";
import { toast } from "../../hooks/use-toast";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export function DiscussionSheet({
  isSheetOpen,
  setIsSheetOpen,
}: {
  isSheetOpen: boolean;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [searchParams] = useSearchParams();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { entity } = useEntity();
  const task = entity as Task;

  const callbacks: SocialStyleCallbacks = {
    loginRequiredCallback: () => {
      toast({
        content: "Please log in first",
      });
    },
    commentTooShortCallback: () => {
      toast({
        content: "Your comment is too short",
      });
    },
  };
  const styleConfig = useSocialStyle();

  const {
    CommentSectionProvider,
    SortByButton,
    CommentsFeed,
    NewCommentForm,
  } = useSocialComments({
    entityId: task?.id,
    highlightedCommentId: searchParams.get("commentId"),
    styleConfig,
    callbacks,
    limit: 10,
  });

  const sortByOptions = (
    <div className="flex px-6 items-center gap-1">
      <h4 className="font-semibold text-base flex-1">Comments</h4>
      <SortByButton
        priority="top"
        activeView={
          <div className="bg-black py-1 px-2 rounded-md text-white text-xs">
            Top
          </div>
        }
        nonActiveView={
          <div className="bg-gray-200 py-1 px-2 rounded-md text-xs">Top</div>
        }
      />

      <SortByButton
        priority="new"
        activeView={
          <div className="bg-black py-1 px-2 rounded-md text-white text-xs">
            New
          </div>
        }
        nonActiveView={
          <div className="bg-gray-200 py-1 px-2 rounded-md text-xs">New</div>
        }
      />
      <SortByButton
        priority="old"
        activeView={
          <div className="bg-black py-1 px-2 rounded-md text-white text-xs">
            Old
          </div>
        }
        nonActiveView={
          <div className="bg-gray-200 py-1 px-2 rounded-md text-xs">Old</div>
        }
      />
    </div>
  );

  const contactDetails = (
    <div className="flex justify-between gap-4">
      {task?.user?.metadata.email ? (
        <div className="flex gap-1.5 text-xs items-center bg-gray-100 px-2.5 py-1 rounded-lg text-gray-600">
          <Mail className="size-3" />
          <div className="mb-0.5">{task.user.metadata.email}</div>
        </div>
      ) : null}
      {task?.user?.metadata.phoneNumber ? (
        <div className="flex gap-1.5 text-xs items-center bg-gray-100 px-2.5 py-1 rounded-lg text-gray-600">
          <Phone className="size-2.5" />
          <div className="mb-0.5">{task.user.metadata.phoneNumber}</div>
        </div>
      ) : null}
    </div>
  );

  const mobileSection = (
    <Drawer open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <DrawerContent className="h-screen overflow-hidden flex flex-col p-0 pt-6 bg-white gap-3">
        <DrawerHeader className="px-6 grid gap-2">
          <div className="grid gap-1">
            <div className="flex items-center">
              <UserAvatar
                user={{ id: task?.user?.id, avatar: task?.user?.avatar }}
              />
              <p className="mx-3 font-medium text-sm">{task?.user?.name}</p>
            </div>
            <DrawerTitle className="text-base text-start">
              {task?.title}
            </DrawerTitle>
            <DrawerDescription className="text-sm text-start">
              {task?.content}
            </DrawerDescription>
          </div>

          {contactDetails}
        </DrawerHeader>
        <CommentSectionProvider>
          {sortByOptions}
          <div className="flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 bg-white">
              <CommentsFeed />
              <div className="w-full h-4" />
            </ScrollArea>
            <div className="border-t">{isSheetOpen && <NewCommentForm />}</div>
          </div>
        </CommentSectionProvider>
      </DrawerContent>
    </Drawer>
  );

  const desktopSection = (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent className="h-screen overflow-hidden flex flex-col p-0 pt-6 bg-white">
        <SheetHeader className="px-6 grid gap-2">
          <div className="grid gap-1">
            <div className="flex items-center">
              <UserAvatar
                user={{ id: task?.user?.id, avatar: task?.user?.avatar }}
              />
              <p className="mx-3 font-medium text-sm">{task?.user?.name}</p>
            </div>
            <SheetTitle className="text-base">{task?.title}</SheetTitle>
            <SheetDescription className="text-sm">
              {task?.content}
            </SheetDescription>
          </div>

          {contactDetails}
        </SheetHeader>
        <CommentSectionProvider>
          {sortByOptions}
          <div className="relative flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 bg-white">
              <CommentsFeed />
              <div className="w-full h-4" />
            </ScrollArea>
            <div className="border-t">{isSheetOpen && <NewCommentForm />}</div>
          </div>
        </CommentSectionProvider>
      </SheetContent>
    </Sheet>
  );

  if (!task) return null;
  return (
    <div className="relative">{isDesktop ? desktopSection : mobileSection}</div>
  );
}

export default DiscussionSheet;

// const contactDetails =
//   user && task && task.metadata.applicants.includes(user.id) ? (
//     <div className="flex justify-between gap-4">
//       {task?.user?.metadata.email ? (
//         <div className="flex gap-1.5 text-xs items-center bg-gray-100 px-2.5 py-1 rounded-lg text-gray-600">
//           <Mail className="size-3" />
//           <div className="mb-0.5">{task.user.metadata.email}</div>
//         </div>
//       ) : null}
//       {task?.user?.metadata.phoneNumber ? (
//         <div className="flex gap-1.5 text-xs items-center bg-gray-100 px-2.5 py-1 rounded-lg text-gray-600">
//           <Phone className="size-2.5" />
//           <div className="mb-0.5">{task.user.metadata.phoneNumber}</div>
//         </div>
//       ) : null}
//     </div>
//   ) : (
//     <div className="flex gap-1.5 text-xs items-center bg-gray-100 px-2.5 py-1 rounded-lg text-gray-600 w-max">
//       <EyeOff className="size-2.5" />
//       <div className="mb-0.5">
//         Contact details are visibile for volunteers only
//       </div>
//     </div>
//   );
