import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@/App.css";
import LoadingScreen from "@/components/LoadingSreeen";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";

const ScreenHome = lazy(() => import("@/screens/Home"));
const ScreenBookDetail = lazy(() => import("@/screens/company/Detail"));
const ScreenRegister = lazy(() => import("@/screens/auth/Register"));
const ScreenRecordCreate = lazy(() => import("@/screens/record/Create"));
const ScreenJobDetail = lazy(() => import("@/screens/job/Detail"));
const ScreenLogin = lazy(() => import("@/screens/auth/Login"));
const ScreenNotFound = lazy(() => import("@/screens/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<ScreenHome />} />
          <Route path="/create" element={<ScreenRecordCreate />} />
          <Route path="/company/:name" element={<ScreenBookDetail />} />
          <Route path="/job/:name" element={<ScreenJobDetail />} />
          <Route path="/login" element={<ScreenLogin />} />
          <Route path="/register" element={<ScreenRegister />} />
          <Route path="*" element={<ScreenNotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
