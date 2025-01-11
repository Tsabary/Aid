import HeaderMobile from "./HeaderMobile";
import HeaderWeb from "./HeaderWeb";

function Header() {
  return (
    <header className="min-h-20 sticky top-0 z-50">
      {/* This is the header for mobile */}
      <HeaderMobile />

      {/* This is the header for big screen */}
      <HeaderWeb />
    </header>
  );
}

export default Header;
