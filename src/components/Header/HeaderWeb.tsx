import { Link } from "react-router-dom";
import { UserAvatar, useUser } from "replyke";

import Logo from "../shared/Logo";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import WebDropdown from "./WebDropdown";

function HeaderWeb() {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <WebDropdown />
      <div className="hidden lg:block">
        <div className="relative mx-auto flex items-center justify-between py-3 px-3 w-full max-w-7xl bg-white">
          <Logo />

          <div className="flex gap-6">
            <Link to="/request-assistance">
              <Button variant="ghost">Looking for Assistance</Button>
            </Link>

            {user ? (
              <DropdownMenuTrigger>
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
