import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Home from "./components/pages/Home";
import MyClaims from "./components/pages/submitters/MyClaims";
import MyClaimInfo from "./components/pages/submitters/MyClaimInfo";
import ClaimInfo from "./components/pages/factcheckers/ClaimInfo";
import Triage from "./components/pages/editors/Triage";
import TriageInfo from "./components/pages/editors/TriageInfo.jsx";
import PageNotFound from "./components/pages/404";
import Login from "./components/pages/Login";
import AvailableClaims from "./components/pages/factcheckers/AvailableClaims";
import MyTasks from "./components/pages/factcheckers/MyTasks";
import AssignClaim from "./components/pages/factcheckers/AssignClaim";
import PublishedClaim from "./components/pages/PublishedClaim.jsx";
import { AuthProvider } from "./components/auth/useAuth.jsx";
import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/claims/:claimId" element={<PublishedClaim />} />
            <Route path="/myclaims" element={<MyClaims />} />
            <Route path="/myclaims/:claimId" element={<MyClaimInfo />} />
            <Route path="/availableclaims" element={<AvailableClaims />} />
            <Route path="/assign/:claimId" element={<AssignClaim />} />
            <Route path="/tasks" element={<MyTasks />} />
            <Route path="/tasks/:claimId" element={<ClaimInfo />} />
            <Route path="/triage" element={<Triage />} />
            <Route path="/triage/:claimId" element={<TriageInfo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
