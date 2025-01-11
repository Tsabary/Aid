import { Menu } from "lucide-react";

function SideDrawer({
  children,
  headerContent,
  isOpen,
  setIsOpen,
  dark,
}: {
  children: JSX.Element;
  headerContent: JSX.Element;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center lg:hidden p-4 bg-white">
      <div>{headerContent}</div>
      <div className="flex-grow" />
      <Menu
        className={["h-7 w-7", dark ? "text-gray-900" : "text-white"].join(" ")}
        onClick={() => setIsOpen(true)}
      />

      <div
        className={
          "fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
          (isOpen
            ? " transition-opacity opacity-100 duration-500 translate-x-0  "
            : " transition-all delay-500 opacity-0 translate-x-full  ")
        }
      >
        <section
          className={
            "w-3/4 max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
            (isOpen ? " translate-x-0 " : " translate-x-full ")
          }
        >
          {children}
        </section>
        <section
          className="w-full h-full cursor-pointer overflow-hidden z-50"
          onClick={() => {
            setIsOpen(false);
          }}
        ></section>
      </div>
    </div>
  );
}

export default SideDrawer;
