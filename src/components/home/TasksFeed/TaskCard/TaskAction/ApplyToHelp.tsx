import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { handleError, useCreateComment, useEntity, useUser } from "@replyke/react-js";
import { Textarea } from "../../../../ui/textarea";
import { Task } from "../../../../../types/Task";
import { cn } from "../../../../../lib/utils";

function ApplyToHelp({
  handleOpenDiscussionSheet,
}: {
  handleOpenDiscussionSheet: (passedTask: Task) => void;
}) {
  const { user } = useUser();
  const { entity } = useEntity();
  const task = entity as Task;

  const createComment = useCreateComment();

  const [showApplication, setShowApplication] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

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

      let content = "I'd like to help";

      content += commentContent ? ` - ${commentContent}` : ".";

      await createComment({ entityId: task.id, content, mentions: [] });

      setShowApplication(false);
      setCommentContent("");
      handleOpenDiscussionSheet(task);
    } catch (err) {
      handleError(err, "Applying to volunteer failed");
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }

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
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
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
        className={cn(
          "p-2 bg-green-400 cursor-pointer w-full text-center text-sm text-white flex items-center justify-center",
          isSubmitting && "opacity-70"
        )}
        onClick={handleApply}
        disabled={isSubmitting}
      >
        {isSubmitting && <LoaderCircle className="size-4 mr-2 animate-spin" />}
        Apply now
      </button>
    </div>
  );
}

export default ApplyToHelp;
