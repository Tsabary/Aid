import {
  AppNotification,
  AppNotificationsProvider,
  useAppNotifications,
  useUser,
} from "@replyke/react-js";
import { Bell, LoaderCircle } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../../../ui/dropdown-menu";
import SingleNotification from "./SingleNotification";

function NotificationsControl() {
  const { appNotifications, unreadAppNotificationsCount, loading } =
    useAppNotifications();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="relative ">
        <Bell className="size-5" fill="white" />
        {unreadAppNotificationsCount! > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 flex justify-center items-center rounded-full text-xs aspect-square size-5 text-white">
            {unreadAppNotificationsCount}
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0">
        {appNotifications?.length ? (
          appNotifications.map(
            (notification: AppNotification.UnifiedAppNotification) => {
              return (
                <SingleNotification
                  notification={notification}
                  key={notification.id}
                />
              );
            }
          )
        ) : (
          <p className="p-4 text-center text-gray-400">Nothing here yet</p>
        )}
        {loading && <LoaderCircle className="animate-spin m-auto" />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const NotificationsControlWrapped = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <AppNotificationsProvider
      notificationTemplates={{
        entityComment: {
          title: `$userName commented on your request "$entityTitle"`,
        },
        commentReply: {
          title: `$userName replied to your comment on "$entityTitle"`,
        },
        commentMention: {
          title: `$userName mentioned you in their comment on "$entityTitle"`,
        },
        entityUpvote: {
          title: `$userName upvoted your comment on "$entityTitle"`,
        },
        commentUpvote: {
          title: `$userName upvoted your comment on "$entityTitle"`,
        },
      }}
    >
      <NotificationsControl />
    </AppNotificationsProvider>
  );
};

export default NotificationsControlWrapped;
