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
            <Button variant="ghost">Looking for Volunteers</Button>
          </Link>
          {user ? (
            <SheetTrigger>
              <UserAvatar user={user} size={36} />
            </SheetTrigger>
          ) : (
            <Link to="/sign-in">
              <Button variant="ghost">Sign in </Button>
            </Link>
          )}
        </div>
      </div>
    </Sheet>
  );

  // return (
  //   <SideDrawer
  //     isOpen={isOpen}
  //     setIsOpen={setIsOpen}
  //     headerContent={
  //       <Link to="/" className="text-2xl font-bold leading-snug text-gray-900">
  //         ⚔️
  //       </Link>
  //     }
  //   >
  //     <div className="py-6 px-3 h-full flex flex-col">
  //       {/* This is the content if there is no user */}
  //       {!user && (
  //         <>
  //           <div
  //             className="flex-row p-3 items-center space-x-3 bg-stone-100 rounded-md mt-2"
  //             onClick={() => {
  //               setIsOpen(false);
  //             }}
  //           >
  //             אני מחפש\ת מתנדבים
  //           </div>
  //           <div
  //             className="flex mt-6 flex-row p-3 items-center space-x-3 bg-stone-100 rounded-md"
  //             onClick={() => {
  //               setIsOpen(false);
  //             }}
  //           >
  //             <LogIn className="h-6 w-6 ml-2" />
  //             <p className={itemTextStyle}>הרשמה \ התחברות</p>
  //           </div>
  //           <div className="flex-1" />
  //           <ContactEmail />
  //         </>
  //       )}

  //       {/* This is the content of the side drawer if the user is logged in */}
  //       {user && (
  //         <>
  //           {/* This is the header with the profile */}
  //           <div className="p-4 bg-stone-100 rounded-md">
  //             {/* <BoringAvatar
  //               size={64}
  //               name={user.id}
  //               variant="beam"
  //               colors={avatarColors.map((c) => `#${c}`)}
  //             /> */}

  //             <p className="text-gray-800 font-bold mt-3">
  //               {user.name ?? "משתמש חדש"}
  //             </p>
  //             <p className="text-gray-800">{"user.email"}</p>
  //           </div>

  //           {/* Divider */}
  //           <div className="w-full h-[1px] bg-stone-100 my-4" />

  //           <div
  //             className="flex-row p-3 items-center space-x-3 bg-stone-100 rounded-md"
  //             onClick={() => {
  //               setIsOpen(false);
  //               navigate(`/my-posts`);
  //             }}
  //           >
  //             הבקשות שלי
  //           </div>

  //           <div
  //             className="flex-row p-3 items-center space-x-3 bg-stone-100 rounded-md mt-2"
  //             onClick={() => {
  //               setIsOpen(false);
  //               navigate(`/find-help`);
  //             }}
  //           >
  //             אני מחפש\ת מתנדבים
  //           </div>

  //           {/* <div
  //             className="flex-row p-3 items-center space-x-3 bg-stone-100 rounded-md mt-2"
  //             onClick={() => {
  //               setIsOpen(false);
  //               navigate(`/donate`);
  //             }}
  //           >
  //             אני רוצה לתרום
  //           </div> */}

  //           {/* Empty div to push everything down */}
  //           <div className="flex-grow" />

  //           {/* Divider */}
  //           <div className="w-full h-[1px] bg-stone-100 my-4" />

  //           <ContactEmail />
  //           <div className="w-full h-[1px] bg-stone-100 my-4" />

  //           {/* Logout button */}
  //           <div
  //             className={itemContainerStyle}
  //             onClick={() => {
  //               navigate("/");
  //               // logout && logout();
  //             }}
  //           >
  //             <LogOut className="h-6 w-6 ml-2" />
  //             <p className={itemTextStyle}>התנתקות</p>
  //           </div>
  //         </>
  //       )}
  //     </div>
  //   </SideDrawer>
  // );
}

export default HeaderMobile;
