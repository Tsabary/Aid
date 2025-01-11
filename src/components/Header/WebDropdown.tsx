import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth, useUser } from "replyke";

function WebDropdown() {
  const { user } = useUser();
  const { signOut } = useAuth();
  return (
    <DropdownMenuContent>
      <DropdownMenuLabel>
        {user?.name && (
          <>
            {user.name} <br />
          </>
        )}

        <span>{user?.email}</span>
      </DropdownMenuLabel>

      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => signOut?.()}>Sign Out</DropdownMenuItem>
    </DropdownMenuContent>
  );
}

export default WebDropdown;
