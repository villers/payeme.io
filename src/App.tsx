import { lazy, Suspense } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";

import "./App.css";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

const ScreenHome = lazy(() => import("./screens/Home"));
const ScreenCompanyList = lazy(() => import("./screens/company/List"));
const ScreenBookDetail = lazy(() => import("./screens/company/Detail"));
const ScreenRecordCreate = lazy(() => import("./screens/record/Create"));
const ScreenJobDetail = lazy(() => import("./screens/job/Detail"));
const ScreenJobList = lazy(() => import("./screens/job/List"));
const ScreenLogin = lazy(() => import("./screens/auth/Login"));
const ScreenRegister = lazy(() => import("./screens/auth/Register"));
const ScreenNotFound = lazy(() => import("./screens/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<ScreenHome />} />
          <Route path="/create" element={<ScreenRecordCreate />} />
          <Route path="/company" element={<ScreenCompanyList />} />
          <Route path="/company/:name" element={<ScreenBookDetail />} />
          <Route path="/job" element={<ScreenJobList />} />
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
