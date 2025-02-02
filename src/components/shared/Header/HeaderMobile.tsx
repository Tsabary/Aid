import { Link } from "react-router-dom";
import { useUser } from "@replyke/react-js";
import { UserAvatar } from "@replyke/comments-social-react-js";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import Logo from "../Logo";
import { Button } from "../../ui/button";
import MobileSheet from "./MobileSheet";
import { NotificationsControl } from "./NotificationsControl";

function HeaderMobile() {
  const { user } = useUser();

  return (
    <Sheet>
      <MobileSheet />
      <div className="flex lg:hidden relative mx-auto items-center justify-between py-3 px-3 w-full max-w-7xl bg-white">
        <Logo />

        <div className="flex gap-6">
          <Link to="/request-aid">
            <Button variant="ghost">Looking for Aid</Button>
          </Link>
          <NotificationsControl />

          {user ? (
            <SheetTrigger>
              <UserAvatar user={user} size={36} />
            </SheetTrigger>
          ) : (
            <Link to="/sign-in">
              <Button variant="ghost">Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </Sheet>
  );
}

export default HeaderMobile;
