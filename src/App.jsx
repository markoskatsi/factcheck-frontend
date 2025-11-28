import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import Layout from "./components/layouts/Layout";
import Home from "./components/pages/Home";
import MyClaims from "./components/pages/MyClaims";
import MyClaimInfo from "./components/pages/MyClaimInfo";
import CreateClaim from "./components/pages/CreateClaim";
import AddSource from "./components/pages/AddSource";
import PageNotFound from "./components/pages/404";
import Login from "./components/pages/Login";
import { AuthProvider } from "./components/auth/useAuth.jsx";
import "./App.scss";

function App() {
 
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myclaims" element={<MyClaims />} />
          <Route path="/myclaims/:claimId" element={<MyClaimInfo />} />
          <Route path="/createclaim" element={<CreateClaim />} />
          <Route path="/addsource/:claimId" element={<AddSource />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
