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

function AppRoutes() {
  const { user } = useUser();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<FeedProvider><HomePage /></FeedProvider>} />
          <Route path="/request-assistance" element={<RequestAssistancePage />} />
        </Route>
        <Route
          path="/sign-in"
          element={user ? <Navigate to="/" /> : <SigninPage />}
        />
        <Route
          path="/sign-up"
          element={user ? <Navigate to="/" /> : <SignupPage />}
        />

        {/* <Route path="/profile" element={<ProfilePage />} />
        <Route path="/find-help" element={<FindHelpPage />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/donate" element={<DonatePage />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
