import { Routes, Route, BrowserRouter } from "react-router-dom";

import { useEffect } from "react";

import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { useAppDispatch } from "./app/store";
import { logoutAction, refreshAction } from "./features/auth/actions";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshAction());
  }, [dispatch]);

  const handleLogout = () => dispatch(logoutAction());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <button onClick={handleLogout}>logout</button>
    </BrowserRouter>
  );
}

export default App;
