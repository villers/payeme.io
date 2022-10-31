import { useEffect, lazy, Suspense } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import { useAppDispatch } from "./app/store";
import { refreshAction } from "./features/auth/actions";

import Header from "./components/header/Header";

const Home = lazy(() => import("./pages/Home"));
const Companies = lazy(() => import("./pages/company/Companies"));
const Company = lazy(() => import("./pages/company/Company"));
const Job = lazy(() => import("./pages/job/Job"));
const Jobs = lazy(() => import("./pages/job/Jobs"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const CreateJob = lazy(() => import("./pages/CreateJob"));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:name" element={<Company />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/create" element={<CreateJob />} />
          <Route path="/jobs/:name" element={<Job />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
