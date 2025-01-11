import { toast } from "react-toastify";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { getCollectionName } from "../../helpers/getCollectionName";

import useAuth from "../../hooks/useAuth";
import useFirebase from "../../hooks/useFirebase";

function ReportTaskComplete({
  task,
  showAuthModal,
}: {
  task: Task;
  showAuthModal: () => void;
}) {
  const { firestore } = useFirebase();
  const { user } = useAuth();
  const handleReportHandled = async () => {
    try {
      if (!firestore) {
        throw new Error("Firestore wasn't initilaized properly");
      }
      if (!user) {
        showAuthModal();
        return;
      }
      const taskRef = doc(firestore, getCollectionName("tasks"), task.id);

      await updateDoc(taskRef, {
        reported_as_handled: arrayUnion(user.id),
      });

      toast.success("תודה על הדיווח!", {
        position: "bottom-right",
        pauseOnHover: false,
        rtl: true,
      });
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
