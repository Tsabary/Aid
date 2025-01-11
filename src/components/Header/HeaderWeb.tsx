import { Link } from "react-router-dom";

import UserMenu from "./UserMenu";
import Logo from "../shared/Logo";

function HeaderWeb({ dark }: { dark?: boolean }) {
  function MenuItem({ href, label }: { href: string; label: string }) {
    return (
      <Link
        to={href}
        className={[
          "font-semibold transition-all ease-in-out cursor-pointer mx-8",
          dark
            ? "text-gray-400 hover:text-gray-900"
            : "text-gray-400 hover:text-white",
        ].join(" ")}
      >
        {label}
      </Link>
    );
  }

  return (
    <div className="hidden lg:block">
      <div className="relative mx-auto flex items-center justify-between py-3 px-3 w-full max-w-7xl bg-white">
        <Logo />

        <div className="flex gap-6">
          <MenuItem href="/find-help" label="אני מחפש\ת מתנדבים" />
          {/* <MenuItem href="/donate" label="אני רוצה לתרום" /> */}
          {/* {user ? (
            <MenuItem href="/studio" label="Studio" />
          ) : (
            <p
              className={[
                "font-semibold transition-all ease-in-out cursor-pointer",
                dark
                  ? "text-gray-400 hover:text-gray-900"
                  : "text-gray-400 hover:text-white",
              ].join(" ")}
              onClick={() => setIsAuthenticationModalShowing(true)}
            >
              Studio
            </p>
          )} */}
        </div>

        <UserMenu dark={dark} />
      </div>
    </div>
  );
}

export default HeaderWeb;
