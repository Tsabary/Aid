import { CommentSection } from "replyke";
import useAuth from "../../hooks/useAuth";

function TaskCommentSection({ task }: { task?: Task }) {
  const { user } = useAuth();
  if (!task) return null;
  return (
    <div>
      <p className="text-3xl font-bold mt-8">תגובות</p>
      {task && (
        <div dir="ltr" className="w-full mt-8">
          <CommentSection
            appKey="2ccnet2ar6ncapws3gp8idomy05yxa"
            articleId={task.id}
            styleId="6528257d1f94234f03eafc73"
            callbacks={{
              loginClickCallback: () => {},
              commentAuthorClickCallback: () => {},
              currentUserClickCallback: () => {},
            }}
            currentUser={
              user
                ? {
                    _id: user.id,
                    name: user.name || "משתמש אנונימי",
                    img:
                      user.avatar ||
                      `https://source.boringavatars.com/beam/120/${user.id}?colors=1E3A8A,1D4ED8,3B82F6,7DD3FC`,
                  }
                : undefined
            }
          />
        </div>
      )}
    </div>
  );
}

export default TaskCommentSection;
