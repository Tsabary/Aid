import { Outlet } from "react-router-dom";

import { Header } from "../Header";

function Layout() {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
