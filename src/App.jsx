import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import Layout from "./components/layouts/Layout";
import Home from "./components/pages/Home";
import MyClaims from "./components/pages/MyClaims";
import MyClaimInfo from "./components/pages/MyClaimInfo";
import ClaimInfo from "./components/pages/ClaimInfo";
import PageNotFound from "./components/pages/404";
import Login from "./components/pages/Login";
import AvailableClaims from "./components/pages/AvailableClaims.jsx";
import MyTasks from "./components/pages/MyTasks.jsx";
import { AuthProvider } from "./components/auth/useAuth.jsx";
import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/claims/:claimId" element={<ClaimInfo />} />
            <Route path="/myclaims" element={<MyClaims />} />
            <Route path="/myclaims/:claimId" element={<MyClaimInfo />} />
            <Route path="/availableclaims" element={<AvailableClaims />} />
            <Route path="/availableclaims/:claimId" element={<ClaimInfo />} />
            <Route path="/mytasks/" element={<MyTasks />} />
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
