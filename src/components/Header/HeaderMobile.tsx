import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


import SideDrawer from "./SideDrawer";
import ContactEmail from "./ContactEmail";
import { LogIn, LogOut } from "lucide-react";

function HeaderMobile({
  dark,
}: {
  dark?: boolean;

}) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const itemContainerStyle =
    "mt-2 flex flex-row p-3 items-center space-x-3 rounded-md";
  const itemTextStyle = "text-base text-gray-800 font-semibold";

  return (
    <SideDrawer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      dark={dark}
      headerContent={
        <Link
          to="/"
          className={[
            "text-2xl font-bold leading-snug",
            dark ? "text-gray-900" : "text-white",
          ].join(" ")}
        >
          ⚔️
        </Link>
      }
    >
      <div className="py-6 px-3 h-full flex flex-col">
        {/* This is the content if there is no user */}
        {!false && (
          <>
            <div
              className="flex-row p-3 items-center space-x-3 bg-stone-100 rounded-md mt-2"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              אני מחפש\ת מתנדבים
            </div>
            <div
              className="flex mt-6 flex-row p-3 items-center space-x-3 bg-stone-100 rounded-md"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <LogIn className="h-6 w-6 ml-2" />
              <p className={itemTextStyle}>הרשמה \ התחברות</p>
            </div>
            <div className="flex-1" />
            <ContactEmail />
          </>
        )}

        {/* This is the content of the side drawer if the user is logged in */}
        {false && (
          <>
            {/* This is the header with the profile */}
            <div className="p-4 bg-stone-100 rounded-md">
              {/* <BoringAvatar
                size={64}
                name={user.id}
                variant="beam"
                colors={avatarColors.map((c) => `#${c}`)}
              /> */}

              <p className="text-gray-800 font-bold mt-3">
                {"user.name" ?? "משתמש חדש"}
              </p>
              <p className="text-gray-800">{"user.email"}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-stone-100 my-4" />

            <div
              className="flex-row p-3 items-center space-x-3 bg-stone-100 rounded-md"
              onClick={() => {
                setIsOpen(false);
                navigate(`/my-posts`);
              }}
            >
              הבקשות שלי
            </div>

            <div
              className="flex-row p-3 items-center space-x-3 bg-stone-100 rounded-md mt-2"
              onClick={() => {
                setIsOpen(false);
                navigate(`/find-help`);
              }}
            >
              אני מחפש\ת מתנדבים
            </div>

            {/* <div
              className="flex-row p-3 items-center space-x-3 bg-stone-100 rounded-md mt-2"
              onClick={() => {
                setIsOpen(false);
                navigate(`/donate`);
              }}
            >
              אני רוצה לתרום
            </div> */}

            {/* Empty div to push everything down */}
            <div className="flex-grow" />

            {/* Divider */}
            <div className="w-full h-[1px] bg-stone-100 my-4" />

            <ContactEmail />
            <div className="w-full h-[1px] bg-stone-100 my-4" />

            {/* Logout button */}
            <div
              className={itemContainerStyle}
              onClick={() => {
                navigate("/");
                // logout && logout();
              }}
            >
              <LogOut className="h-6 w-6 ml-2" />
              <p className={itemTextStyle}>התנתקות</p>
            </div>
          </>
        )}
      </div>
    </SideDrawer>
  );
}

export default HeaderMobile;
