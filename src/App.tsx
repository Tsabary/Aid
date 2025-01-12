import { AuthProvider, ProjectProvider } from "replyke";
import AppRoutes from "./AppRoutes";
import { Toaster } from "./components/ui/toaster";

function App() {
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
