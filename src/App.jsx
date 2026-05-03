import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Home from "./components/pages/shared/Home.jsx";
import MyClaims from "./components/pages/submitters/MyClaims";
import MyClaimInfo from "./components/pages/submitters/MyClaimInfo";
import ClaimInfo from "./components/pages/factcheckers/ClaimInfo";
import Triage from "./components/pages/editors/Triage";
import TriageInfo from "./components/pages/editors/TriageInfo.jsx";
import PageNotFound from "./components/pages/shared/404.jsx";
import Login from "./components/pages/shared/Login.jsx";
import AvailableClaims from "./components/pages/factcheckers/AvailableClaims";
import MyTasks from "./components/pages/factcheckers/MyTasks";
import AssignClaim from "./components/pages/factcheckers/AssignClaim";
import PublishedClaim from "./components/pages/shared/PublishedClaim.jsx";
import Review from "./components/pages/editors/Review.jsx";
import ReviewInfo from "./components/pages/editors/ReviewInfo.jsx";
import EditorTasks from "./components/pages/editors/EditorTasks.jsx";
import EditorTaskInfo from "./components/pages/editors/EditorTaskInfo.jsx";
import Profile from "./components/pages/shared/Profile.jsx";
import Logout from "./components/pages/shared/Logout.jsx";
import Disputes from "./components/pages/editors/Disputes.jsx";
import DisputeInfo from "./components/pages/editors/DisputeInfo.jsx";
import ResolveDispute from "./components/pages/editors/ResolveDispute.jsx";
import Register from "./components/pages/shared/Register.jsx";
import { useAuth } from "./components/auth/useAuth.jsx";
import "./App.scss";

function App() {
  const { loggedInUser } = useAuth();
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/claims/:claimId" element={<PublishedClaim />} />
          {loggedInUser?.UserUsertypeID === 1 && (
            <>
              <Route path="/myclaims" element={<MyClaims />} />
              <Route path="/myclaims/:claimId" element={<MyClaimInfo />} />
            </>
          )}
          {loggedInUser?.UserUsertypeID === 2 && (
            <>
              <Route path="/availableclaims" element={<AvailableClaims />} />
              <Route path="/assign/:claimId" element={<AssignClaim />} />
              <Route path="/tasks" element={<MyTasks />} />
              <Route path="/tasks/:claimId" element={<ClaimInfo />} />
            </>
          )}
          {loggedInUser?.UserUsertypeID === 3 && (
            <>
              <Route path="/triage" element={<Triage />} />
              <Route path="/triage/:claimId" element={<TriageInfo />} />
              <Route path="/review" element={<Review />} />
              <Route path="/review/:claimId" element={<ReviewInfo />} />
              <Route path="/editortasks" element={<EditorTasks />} />
              <Route path="/verdict/:claimId" element={<EditorTaskInfo />} />
              <Route path="/disputes" element={<Disputes />} />
              <Route path="/disputes/:claimId" element={<DisputeInfo />} />
              <Route
                path="/ref/disputes/:claimId"
                element={<ResolveDispute />}
              />
            </>
          )}
          {loggedInUser && <Route path="/profile" element={<Profile />} />}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
