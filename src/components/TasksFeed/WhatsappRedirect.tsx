import { useState } from "react";

import ConfirmationModal, {
  ConfirmationModalAnswer,
} from "./ConfirmationModal";
import { useUser } from "replyke";

function WhatsappRedirect({
  // task,
  showAuthModal,
}: {
  task: Task;
  showAuthModal: () => void;
}) {

  const { user } = useUser();
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const dontAskAgain = localStorage.getItem("dontAskAgain") === "true";

  const redirectToWhatsapp = async () => {
    // try {
 
    //   let number = "task.author_phone_number";
    //   if (number[0] === "+") {
    //     number = number.substring(1);
    //   }
    //   window.open(`https://wa.me/${number}`, "_blank");
    //   const analyticsInstance = await initializeAnalytics();
    //   if (analyticsInstance) logEvent(analyticsInstance, "whatsapp_click");
    // } catch (err: unknown) {
    //   console.log("rediredt to whatsapp failed");
    // }
  };

  const onWhatsappClick = async () => {
    if (!user) {
      showAuthModal();
      return;
    }
    if (localStorage.getItem("dontAskAgain") !== "true") {
      setShowConfirmationPopup(true);
      return;
    }

    await redirectToWhatsapp();
  };

  const onConfirmClose = async (
    answer: ConfirmationModalAnswer,
    dontAskAgain: boolean
  ) => {
    setShowConfirmationPopup(false);

    if (dontAskAgain) localStorage.setItem("dontAskAgain", "true");

    if (answer === "yes") {
      await redirectToWhatsapp();
    }
  };

  return (
    <>
      {!dontAskAgain && (
        <ConfirmationModal
          onClose={onConfirmClose}
          showPopup={showConfirmationPopup}
          showDontAskAgain={true}
          body={
            <p className={`text-right`}>
              <div className="font-bold">רגע לפני</div>
              <div>רצינו להזכיר לך להיזהר בתקשורת מול אנשים לא מוכרים.</div>
              <div>אנחנו מבצעים בדיקות מסוימות מצידנו אך תמיד טוב לשים לב.</div>
              <div>לפני שנפגשים - ממליצים לוודא מי נמצא בצד השני ❤️</div>
              <div>האם להמשיך ל-Whatsapp?</div>
            </p>
          }
        />
      )}
      <div
        onClick={onWhatsappClick}
        className="p-2 border-t border-gray-200 flex items-center cursor-pointer"
      >
        {/* <ImWhatsapp className="h-5 w-5 text-green-500" /> */}
        <p className="text-sm font-medium text-green-500 mx-2">
          שלחו הודעה בוואצאפ
        </p>
      </div>
    </>
  );
}

export default WhatsappRedirect;
