import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useEntity, useUser } from "replyke";
import LabeledTextArea from "../../../ui/cusotm/LabledTextArea";
import LabeledInput from "../../../ui/cusotm/LabledInput";

function ApplyToHelp() {
  const { user } = useUser();
  const { entity: task } = useEntity();

  const [showApplication, setShowApplication] = useState(false);
  const [details, setDetails] = useState("");
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("+972");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  async function handleApply() {
    try {
      if (!user) {
        throw new Error("No user authenticated");
      }

      if (isSubmitting) {
        throw new Error("Already submitting");
      }

      if (user.id === task.user.id) {
        throw new Error("User is the task author");
      }

      if (task.metadata.applicants.includes(user.id)) {
        throw new Error("User has already applied");
      }

      if (!name) {
        setErrors({ name: "בבקשה הזינו שם" });
        throw new Error("Please add your name");
      }
      if (!phoneNumber || phoneNumber.length < 10) {
        setErrors({ phoneNumber: "בבקשה הזינו מספר טלפון תקין" });
        throw new Error("Please add your phone number");
      }
      setIsSubmitting(true);

      const newApplicant: TaskApplicationDraft = {
        task_id: task.id,
        task_authorId: task.user.id,
        applicant_id: user.id,
        applicant_name: name,
        applicant_phone_number: phoneNumber,
        additional_info: details,
        status: "new",
      };

      if (user.avatar) {
        newApplicant["applicant_avatar"] = user.avatar;
      }

      // const taskRef = collection(firestore, getCollectionName("applications"));

      // await addDoc(taskRef, newApplicant);
      setTask((t) => ({
        ...t,
        applicants: [...t.metadata.applicants, user.id],
      }));
    } catch (err) {
      console.log("Failed to apply: ", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (!user) return;
    if (user.name) {
      setName(user.name);
    }
  }, [user]);

  if (user && task.metadata.applicants.includes(user.id)) {
    return (
      <div className="p-2 bg-gray-300 cursor-pointer">
        <p className="text-center text-sm text-gray-500">תודה שהצעת עזרה</p>
      </div>
    );
  }

  if (!showApplication) {
    return (
      <div
        className="p-2 bg-green-400 cursor-pointer"
        onClick={() => setShowApplication(true)}
      >
        <p className="text-center text-sm text-white">הציעו לעזור</p>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200">
      <div className="p-2 flex flex-col space-y-2">
        <LabeledInput
          label="שם (פרטי מספיק)"
          value={name}
          onChange={setName}
          error={errors["name"]}
        />
        <LabeledInput
          label="טלפון נייד"
          value={phoneNumber}
          dir="ltr"
          onChange={(phone_number) => {
            if (phone_number.startsWith("+972")) {
              // Extract the part after +972 and check if it's numeric
              const restOfValue = phone_number.slice(4);
              if (/^\d*$/.test(restOfValue) || restOfValue === "") {
                setPhoneNumber(phone_number);
              }
            }
          }}
          error={errors["phoneNumber"]}
        />

        <LabeledTextArea
          value={details}
          onChange={setDetails}
          label="פרטים נוספים"
          rows={3}
        />
        <p
          onClick={() => setShowApplication(false)}
          className="text-sm text-gray-500 text-center underline cursor-pointer"
        >
          ביטול
        </p>
      </div>
      {user ? (
        <div className="p-2 bg-green-400 cursor-pointer" onClick={handleApply}>
          <p className="text-center text-sm text-white">שלחו הצעת סיוע</p>
        </div>
      ) : (
        <Link to="/sign-in" />
      )}
    </div>
  );
}

export default ApplyToHelp;
