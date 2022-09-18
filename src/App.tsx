import { useEffect } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import { useAppDispatch } from "./app/store";
import { refreshAction } from "./features/auth/actions";
import { Header } from "./components/header/Header";
import { Home } from "./pages/Home";
import { Company } from "./pages/Company";
import { Job } from "./pages/Job";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

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
        <Route path="/companies" element={<Company />} />
        <Route path="/jobs" element={<Job />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
