import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function UserMenu({ dark }: { dark?: boolean }) {
  // const navigate = useNavigate();

  const userDropdown = (
    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return false ? (
    // <Dropdown
    //   inline
    //   label={false && <div className="size-12 aspect-square rounded-full" />}
    //   arrowIcon={false}
    //   placement="top-end"
    // >
    //   <Dropdown.Header>
    //     <span className="block truncate text-sm font-medium">
    //       {"user?.name"}
    //     </span>
    //     <span className="block truncate text-sm">{"user?.email"}</span>
    //   </Dropdown.Header>
    //   <Dropdown.Item
    //     onClick={() => {
    //       navigate("/profile");
    //     }}
    //   >
    //     אני מעוניינ\ת להתנדב
    //   </Dropdown.Item>
    //   <Dropdown.Item
    //     onClick={() => {
    //       navigate("/my-posts");
    //     }}
    //   >
    //     הבקשות שלי
    //   </Dropdown.Item>
    //   <Dropdown.Divider />
    //   <Dropdown.Item
    //     onClick={() => {
    //       // logout && logout();
    //     }}
    //   >
    //     התנתקות
    //   </Dropdown.Item>
    // </Dropdown>
    userDropdown
  ) : (
    <p
      className={[
        "font-semibold w-max cursor-pointer",
        dark ? "text-gray-900" : "text-white",
      ].join(" ")}
    >
      הרשמה \ התחברות
    </p>
  );
}

export default UserMenu;
