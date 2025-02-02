import { Link } from "react-router-dom";
import { useUser } from "@replyke/react-js";
import { UserAvatar } from "@replyke/comments-social-react-js";

import Logo from "../Logo";
import { Button } from "../../ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import WebDropdown from "./WebDropdown";
import CompleteYourProfile from "./CompleteYourProfile";
import { NotificationsControl } from "./NotificationsControl";

function HeaderWeb({
  setProfileDialogOpen,
}: {
  setProfileDialogOpen: (state: boolean) => void;
}) {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <WebDropdown setProfileDialogOpen={setProfileDialogOpen} />
      <div className="hidden lg:block">
        <div className="relative mx-auto flex items-center justify-between py-3 px-3 w-full max-w-7xl bg-white">
          <Logo />

          <div className="flex gap-6">
            <CompleteYourProfile setProfileDialogOpen={setProfileDialogOpen} />
            <Link to="/request-aid">
              <Button variant="ghost">Looking for Aid</Button>
            </Link>

            <NotificationsControl />
            {user ? (
              <DropdownMenuTrigger className="flex items-center">
                <UserAvatar user={user} />
              </DropdownMenuTrigger>
            ) : (
              <Link to="/sign-in">
                <Button variant="ghost">Sign in</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </DropdownMenu>
  );
}

export default HeaderWeb;
