import { Routes, Route, BrowserRouter } from "react-router-dom";

import { login, logout } from "./features/auth/slice";
import { auth, onAuthStateChanged, signOut } from "./firebase/config";
import { useCallback, useEffect } from "react";

import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { useAppDispatch } from "./app/store";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
          })
        );
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <button onClick={() => dispatch(logout())}>logout</button>
    </BrowserRouter>
  );
}

export default App;
