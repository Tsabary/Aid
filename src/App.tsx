import { useEffect } from "react";
import { ReplykeProvider } from "@replyke/react-js";
import AppRoutes from "./AppRoutes";
import { Toaster } from "./components/ui/toaster";
// import { FirebaseProvider } from "./context/firebase-context";
// import { FirebaseAuthProvider } from "./context/firebase-auth-context";
// import useFirebaseAuth from "./hooks/useFirebaseAuth";

function App() {
  // const { authUser } = useFirebaseAuth();

  const loadGoogleMapsScript = () => {
    const apiKey = import.meta.env.VITE_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (apiKey) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else {
      console.error("Google Maps API key is missing!");
    }
  };

  // useEffect(() => {
  //   const generateJwt = async () => {
  //     try {
  //       const token = await getToken(); // Get the Clerk session token

  //       const path = process.env.EXPO_PUBLIC_SERVER_URL + "/sign-token";
  //       const response = await axios.get(path, {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Include the token in the Authorization header
  //         },
  //       });

  //       const signedTokenResponse = response.data;
  //       if (signedTokenResponse) setSignedToken(signedTokenResponse);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       throw error; // Re-throw the error for the caller to handle
  //     }
  //   };

  //   if (userClerk) generateJwt();
  // }, [userClerk]);

  useEffect(() => {
    loadGoogleMapsScript();
  }, []);

  return (
    <ReplykeProvider projectId={import.meta.env.VITE_PUBLIC_REPLYKE_PROJECT_ID}>
      <Toaster />
      <AppRoutes />
    </ReplykeProvider>
  );
}

const WrappedApp = () => {
  return (
    // <FirebaseProvider>
    // <FirebaseAuthProvider>
    <App />
    // </FirebaseAuthProvider>
    // </FirebaseProvider>
  );
};

export default WrappedApp;
