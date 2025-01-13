import { useAuth, useUser } from "replyke";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

function WebDropdown() {
  const navigate = useNavigate();
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
      <DropdownMenuItem
        onClick={() => navigate("/my-requests")}
        className="cursor-pointer"
      >
        My Requests
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => signOut?.()} className="cursor-pointer">
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

export default WebDropdown;
