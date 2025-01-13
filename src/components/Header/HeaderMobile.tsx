import { Link } from "react-router-dom";
import { UserAvatar, useUser } from "replyke";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import Logo from "../shared/Logo";
import { Button } from "../ui/button";
import MobileSheet from "./MobileSheet";

function HeaderMobile() {
  const { user } = useUser();

  return (
    <Sheet>
      <MobileSheet />
      <div className="flex lg:hidden relative mx-auto items-center justify-between py-3 px-3 w-full max-w-7xl bg-white">
        <Logo />

        <div className="flex gap-6">
          <Link to="/find-volunteers">
            <Button variant="ghost">Looking for Aid</Button>
          </Link>
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
