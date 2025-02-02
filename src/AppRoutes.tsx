import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { FeedProvider, useUser } from "@replyke/react-js";
import Layout from "./components/shared/Layout";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import RequestAssistancePage from "./pages/RequestAssistancePage";
import WelcomePage from "./pages/WelcomePage";
import ProfilePage from "./pages/ProfilePage";
import EditRequestPage from "./pages/EditRequestPage";
import TaskPage from "./pages/TaskPage";

function AppRoutes() {
  const { user } = useUser();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <FeedProvider idle>
                <HomePage />
              </FeedProvider>
            }
          />
          <Route
            path="/profile/:profileId"
            element={
              <FeedProvider idle>
                <ProfilePage />
              </FeedProvider>
            }
          />
          <Route
            path="/request-aid"
            element={!user ? <Navigate to="/sign-in" /> :<RequestAssistancePage />}
          />
          <Route path="/task/:taskId" element={<TaskPage />} />
          <Route path="/task/:taskId/edit" element={<EditRequestPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
        </Route>
        <Route
          path="/sign-in"
          element={user ? <Navigate to="/" /> : <SigninPage />}
        />
        <Route
          path="/sign-up"
          element={user ? <Navigate to="/" /> : <SignupPage />}
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
