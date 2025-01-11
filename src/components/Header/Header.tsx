import HeaderMobile from "./HeaderMobile";
import HeaderWeb from "./HeaderWeb";

function Header({ dark }: { dark?: boolean }) {

  return (
    <header className="min-h-20 sticky top-0 z-50">
      {/* This is the header for mobile */}
      <HeaderMobile
        dark={dark}
      />

      {/* This is the header for big screen */}
      <HeaderWeb
        dark={dark}
      />
    </header>
  );
}

export default Header;
