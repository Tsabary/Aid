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

        <span className={user?.name ? "font-normal" : ""}>{user?.email}</span>
      </DropdownMenuLabel>

      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => signOut?.()} className="cursor-pointer">
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

export default WebDropdown;
