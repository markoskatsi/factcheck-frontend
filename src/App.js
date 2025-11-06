import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layouts/Layout";
import Home from "./components/pages/Home";
import MyClaims from "./components/pages/MyClaims";
import MyClaimInfo from "./components/pages/MyClaimInfo";
import PageNotFound from "./components/pages/404";
import Login from "./components/pages/Login";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myclaims" element={<MyClaims />} />
          <Route path="/myclaims/:claimId" element={<MyClaimInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
