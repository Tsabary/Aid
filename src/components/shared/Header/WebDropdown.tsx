import { useAuth, useUser } from "replyke";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

function WebDropdown({
  setProfileDialogOpen,
}: {
  setProfileDialogOpen: (state: boolean) => void;
}) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useAuth();
  if (!user) return null;
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
        onClick={() => navigate("/profile/" + user.id)}
        className="cursor-pointer"
      >
        My Requests
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => setProfileDialogOpen(true)}
        className="cursor-pointer"
      >
        Edit Profile
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => signOut?.()} className="cursor-pointer">
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

export default WebDropdown;
