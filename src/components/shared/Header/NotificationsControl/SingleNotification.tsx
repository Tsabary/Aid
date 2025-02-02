import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppNotification, useAppNotifications } from "@replyke/react-js";
import { FromNow, UserAvatar } from "@replyke/comments-social-react-js";


function SingleNotification({
  notification: notificationParam,
}: {
  notification: AppNotification.UnifiedAppNotification;
}) {
  const navigate = useNavigate();
  const { markNotificationAsRead } = useAppNotifications();
  const [notification, setNotification] = useState(notificationParam);

  const handleNavigation = () => {
    if (
      notification.action === "open-entity" &&
      "entityShortId" in notification.metadata
    ) {
      navigate(`/task/${notification.metadata.entityShortId}`);
    }

    if (
      notification.action === "open-comment" &&
      "entityShortId" in notification.metadata &&
      "commentId" in notification.metadata
    ) {
      navigate(
        `/task/${notification.metadata.entityShortId}?commentId=${notification.metadata.commentId}`
      );
    }
  };
  return (
    <div
      onClick={() => {
        handleNavigation();
        if (notification.isRead) return;
        markNotificationAsRead!(notification.id);
        setNotification((prevNotif) => ({ ...prevNotif, isRead: true }));
      }}
      className="hover:bg-blue-50 flex gap-4 w-full items-start p-3 cursor-pointer"
    >
      {notification.metadata?.initiatorId && (
        <UserAvatar
          user={{
            id: notification.metadata.initiatorId,
            name: notification.metadata.initiatorName,
            avatar: notification.metadata.initiatorAvatar,
            username: notification.metadata.initiatorUsername,
          }}
        />
      )}
      <div>
        <div className="text-sm font-medium leading-tight">
          {notification.title}{" "}
          <span className="opacity-75">
            <span className="whitespace-nowrap">
              <span className="opacity-35" style={{ fontSize: 10 }}>
                ●
              </span>{" "}
              <FromNow time={notification.createdAt} />
            </span>
          </span>
        </div>
        {notification.content && (
          <div className="text-sm opacity-65 mt-2">{notification.content}</div>
        )}
      </div>
      {!notification.isRead && (
        <div className="size-2 bg-blue-700 rounded-full self-center shrink-0" />
      )}
    </div>
  );
}

export default SingleNotification;
