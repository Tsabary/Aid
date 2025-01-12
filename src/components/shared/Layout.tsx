import { Outlet } from "react-router-dom";

import { Header } from "../Header";
import Footer from "../Footer";

function Layout() {
  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="flex flex-col items-center p-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
