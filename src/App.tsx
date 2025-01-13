import { useEffect } from "react";
import { AuthProvider, ProjectProvider } from "replyke";
import AppRoutes from "./AppRoutes";
import { Toaster } from "./components/ui/toaster";

function App() {
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

  useEffect(() => {
    loadGoogleMapsScript();
  }, []);

  return (
    <ProjectProvider projectId={import.meta.env.VITE_PUBLIC_REPLYKE_PROJECT_ID}>
      <AuthProvider>
        <Toaster />
        <AppRoutes />
      </AuthProvider>
    </ProjectProvider>
  );
}

export default App;
