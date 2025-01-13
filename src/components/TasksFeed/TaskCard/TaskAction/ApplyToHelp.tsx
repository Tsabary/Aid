import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { handleError, useCreateComment, useEntity, useUser } from "replyke";
import { Textarea } from "../../../ui/textarea";
import { Task } from "../../../../types/Task";
import { LoaderCircle } from "lucide-react";

function ApplyToHelp() {
  const { user } = useUser();
  const { entity } = useEntity();
  const task = entity as Task;

  const createComment = useCreateComment({
    loginRequiredCallback: () => {
      // We're not passing anything because createComment is only called after we've verified there is a logged in user
    },
    commentTooShortCallback: () => {
      // We're not passing anything because we add content to the comment ourselves anyway
    },
  });

  const [showApplication, setShowApplication] = useState(false);
  const [details, setDetails] = useState("");
  const [name, setName] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  async function handleApply() {
    if (isSubmittingRef.current) return;
    if (!user) throw new Error("No user authenticated");

    if (user.id === task.user?.id) {
      throw new Error("User is the task author");
    }

    if (task.metadata.applicants?.includes(user.id)) {
      throw new Error("User has already applied");
    }

    if (!task.user?.name) {
      throw new Error("User's profile is incomplete");
    }
    try {
      isSubmittingRef.current = true;
      setIsSubmitting(true);

      // const newApplicant: TaskApplicationDraft = {
      //   task_id: task.id,
      //   task_authorId: task.user.id,
      //   applicant_id: user.id,
      //   applicant_name: name,
      //   applicant_phone_number: phoneNumber,
      //   additional_info: details,
      //   status: "new",
      // };

      // const taskRef = collection(firestore, getCollectionName("applications"));

      // await addDoc(taskRef, newApplicant);
      // setTask((t) => ({
      //   ...t,
      //   applicants: [...t.metadata.applicants, user.id],
      // }));
    } catch (err) {
      handleError(err, "Applying to volunteer failed");
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (!user) return;
    if (user.name) {
      setName(user.name);
    }
  }, [user]);

  if (!user) {
    return (
      <Link to="/sign-in">
        <button className="p-2 bg-green-400 cursor-pointer w-full text-center text-sm text-white">
          I can help
        </button>
      </Link>
    );
  }

  if (task?.metadata.applicants?.includes(user.id)) {
    return (
      <div className="p-2 bg-gray-300 text-center text-sm text-gray-500">
        Applied
      </div>
    );
  }

  if (!showApplication) {
    return (
      <button
        className="p-2 bg-green-400 cursor-pointer w-full text-center text-sm text-white"
        onClick={() => setShowApplication(true)}
      >
        I can help
      </button>
    );
  }

  return (
    <div className="border-t border-gray-200">
      <div className="p-2 flex flex-col gap-2">
        <Textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Add a comment.."
          rows={3}
        />
        <p
          onClick={() => setShowApplication(false)}
          className="text-sm text-gray-500 text-center underline cursor-pointer"
        >
          Cancel
        </p>
      </div>
      <button
        className="p-2 bg-green-400 cursor-pointer w-full text-center text-sm text-white flex items-center"
        onClick={handleApply}
        disabled={isSubmitting}
      >
        {isSubmitting && <LoaderCircle className="size-4 mr-2 animate-spin" />}
        Submit my offer
      </button>
    </div>
  );
}

export default ApplyToHelp;
