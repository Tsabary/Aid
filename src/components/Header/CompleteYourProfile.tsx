import { Link } from "react-router-dom";
import { useUser } from "replyke";
import { Button } from "../ui/button";

function CompleteYourProfile({
  setProfileDialogOpen,
}: {
  setProfileDialogOpen: (state: boolean) => void;
}) {
  const { user } = useUser();

  const remainingSteps =
    (user?.name ? 0 : 1) +
    (user?.metadata.phoneNumber || user?.metadata.email ? 0 : 1);

  if (!user || remainingSteps === 0) return null;
  return (
    <Link to="/request-assistance">
      <Button
        onClick={() => {
          setProfileDialogOpen(true);
        }}
        variant="ghost"
        className="text-blue-500 hover:text-blue-500"
      >
        {3 - remainingSteps}/3 Complete your profile
      </Button>
    </Link>
  );
}

export default CompleteYourProfile;
