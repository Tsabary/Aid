import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      className="text-4xl font-bold leading-snug text-gray-900 cursor-pointer"
      to={`/`}
    >
      ⚕️
    </Link>
  );
}

export default Logo;
