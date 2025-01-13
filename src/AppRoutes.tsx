import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import { FeedProvider, useUser } from "replyke";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import Layout from "./components/shared/Layout";
import RequestAssistancePage from "./pages/RequestAssistancePage";
import WelcomePage from "./pages/WelcomePage";
import Profile from "./pages/Profile";
import EditRequest from "./pages/EditRequest";

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
                <Profile />
              </FeedProvider>
            }
          />
          <Route
            path="/request-assistance"
            element={<RequestAssistancePage />}
          />
          <Route path="/task/:taskId/edit" element={<EditRequest />} />
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
