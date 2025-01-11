import { ReactNode } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-black.webp";
import auth from "../../assets/auth.webp";

function AuthenticationFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 h-screen overflow-hidden items-stretch">
      <div className="bg-white flex flex-col">
        <Link to="/">
          <img src={logo} className="h-8 aspect-auto self-start m-8" />
        </Link>
        <div className="flex items-center justify-center py-12 flex-1">
          <div className="mx-auto grid w-[350px] gap-6">{children}</div>
        </div>
        <div className="p-6 text-sm font-medium flex gap-6 text-gray-500">
          <div>© Replyke {new Date().getFullYear()}</div>
          <a
            href="https://www.freeprivacypolicy.com/live/a7fe05af-6b92-4ecf-bbd6-c01f51bc76b6"
            target="_blank"
            className="hover:underline cursor-pointer"
          >
            Privacy Policy
          </a>
        </div>
      </div>
      <img
        src={auth}
        alt="Image"
        className="hidden lg:!block object-cover dark:brightness-[0.2] dark:grayscale overflow-hidden w-full"
      />
    </div>
  );
}

export default AuthenticationFrame;
