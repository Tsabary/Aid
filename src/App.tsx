import { ProjectProvider } from "replyke";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <ProjectProvider projectId={import.meta.env.VITE_PUBLIC_REPLYKE_PROJECT_ID}>
      <AppRoutes />
    </ProjectProvider>
  );
}

export default App;
