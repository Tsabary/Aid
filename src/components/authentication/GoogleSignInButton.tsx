import googleIcon from "../../assets/google.svg";

function GoogleSignInButton() {
  // const BASE_URL = import.meta.env.VITE_PUBLIC_SERVER_URL;
  const url = "BASE_URL" + "/api/v1/clients-auth/google";

  return (
    <a
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
      href={url}
    >
      <img src={googleIcon} className="size-5 mr-2" />
      Sign in with Google
    </a>
  );
}

export default GoogleSignInButton;
