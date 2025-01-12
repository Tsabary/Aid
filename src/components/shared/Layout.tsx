import { Outlet } from "react-router-dom";

import { Header } from "../Header";
import Footer from "../Footer";
import { useState } from "react";
import UserProfileDialog from "../UserProfileDialog";

function Layout() {
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  return (
    <>
      <UserProfileDialog
        open={profileDialogOpen}
        setOpen={setProfileDialogOpen}
      />
      <div className="min-h-screen relative">
        <Header setProfileDialogOpen={setProfileDialogOpen} />
        <div className="flex flex-col items-center p-4">
          <Outlet context={{ profileDialogOpen, setProfileDialogOpen }} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
