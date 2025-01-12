import { useUser } from "replyke";

function ReportTaskComplete({
  task,
  showAuthModal,
}: {
  task: Task;
  showAuthModal: () => void;
}) {
  const { user } = useUser();
  const handleReportHandled = async () => {
    try {
      // if (!firestore) {
      //   throw new Error("Firestore wasn't initilaized properly");
      // }
      // if (!user) {
      //   showAuthModal();
      //   return;
      // }
      // const taskRef = doc(firestore, getCollectionName("tasks"), task.id);
      // await updateDoc(taskRef, {
      //   reported_as_handled: arrayUnion(user.id),
      // });
      // toast.success("תודה על הדיווח!", {
      //   position: "bottom-right",
      //   pauseOnHover: false,
      //   rtl: true,
      // });
    } catch (err: unknown) {
      console.log("Failed to report as handled");
    }
  };

  return (
    <div onClick={handleReportHandled} className="p-2 border-t border-gray-200">
      <p className="text-xs underline cursor-pointer">פניתי ונאמר לי שטופל</p>
    </div>
  );
}

export default ReportTaskComplete;
