import { SheetContent } from "@/components/ui/sheet";
import { LogOut } from "lucide-react";
import { useAuth, useUser } from "replyke";

function MobileSheet() {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <SheetContent className="flex flex-col justify-between">
      <div className="bg-gray-100 p-4 rounded-md mt-8">
        {user?.name && (
          <div className="font-medium">
            {user.name}
            <br />
          </div>
        )}

        <span>{user?.email}</span>
      </div>
      <button
        onClick={signOut}
        className="p-4 flex items-center gap-2 text-gray-400"
      >
        <LogOut className="size-4" />
        Log out
      </button>
    </SheetContent>
  );
}

export default MobileSheet;
