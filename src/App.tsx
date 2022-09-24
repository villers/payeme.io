import { useEffect } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import { useAppDispatch } from "./app/store";
import { refreshAction } from "./features/auth/actions";
import { Header } from "./components/header/Header";
import { Home } from "./pages/Home";
import { Companies } from "./pages/company/Companies";
import { Company } from "./pages/company/Company";
import { Job } from "./pages/Job";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { CreateJob } from "./pages/CreateJob";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:name" element={<Company />} />
        <Route path="/jobs" element={<Job />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/job/create" element={<CreateJob />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
