import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Home from "./components/pages/Home";
import MyClaims from "./components/pages/MyClaims";
import MyClaimInfo from "./components/pages/MyClaimInfo";
import ClaimInfo from "./components/pages/ClaimInfo";
import PageNotFound from "./components/pages/404";
import Login from "./components/pages/Login";
import AvailableClaims from "./components/pages/AvailableClaims.jsx";
import MyTasks from "./components/pages/MyTasks.jsx";
import AssignClaim from "./components/pages/AssignClaim.jsx";
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
