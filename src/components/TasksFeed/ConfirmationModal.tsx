import { Button, Checkbox, Label, Modal } from "flowbite-react";
import { ReactNode, useRef, RefObject } from "react";
import { IoClose } from "react-icons/io5";

export type ConfirmationModalAnswer = "yes" | "no" | "cancel";
export type ConfirmationModalButtons = "yes-no" | "yes-only";

export interface ConfirmationModalProps {
  showPopup: boolean;
  onClose?: (answer: ConfirmationModalAnswer, dontAskAgain: boolean) => void;
  body?: ReactNode;
  yesText?: string;
  noText?: string;
  showDontAskAgain?: boolean;
  dontAskAgainText?: string;
  buttonsToShow?: ConfirmationModalButtons;
}

function ConfirmationModal({
  showPopup,
  onClose,
  body = "האם אתה בטוח?",
  yesText = "כן",
  noText = "לא",
  showDontAskAgain = false,
  dontAskAgainText = "אל תשאל אותי שוב",
  buttonsToShow = "yes-no",
}: ConfirmationModalProps) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleModalClose = (answer: ConfirmationModalAnswer) => {
    if (onClose) {
      const isChecked = checkboxRef.current ? checkboxRef.current.checked : false;
      onClose(answer, isChecked);
    }
  };

  return (
    <Modal
      onClose={() => handleModalClose("cancel")}
      size="sm"
      dismissible
      show={showPopup}
    >
      <IoClose
        onClick={() => handleModalClose("cancel")}
        className="h-6 w-6 cursor-pointer absolute top-4 left-4"
      />
      <div className="p-6 mt-10">
        <p className="text-center text-xl">{body}</p>
      </div>
      <div className="px-4 py-2 inline-flex gap-4 ">
        <Button
          size="xl"
          onClick={() => handleModalClose("yes")}
          className="grow"
        >
          {yesText}
        </Button>
        {buttonsToShow === "yes-no" && (
          <Button
            size="xl"
            color="light"
            onClick={() => handleModalClose("no")}
            className="grow"
          >
            {noText}
          </Button>
        )}
      </div>
      {showDontAskAgain && (
        <div className="pb-2 px-4 flex items-center gap-2">
          <Checkbox id="dont-ask" ref={checkboxRef as RefObject<HTMLInputElement>} />
          <Label htmlFor="dont-ask">{dontAskAgainText}</Label>
        </div>
      )}
      {!showDontAskAgain && <div className="pb-2" />}
    </Modal>
  );
}

export default ConfirmationModal;
