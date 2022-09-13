import { Routes, Route, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { auth, onAuthStateChanged } from "./firebase/config";
import { useEffect } from "react";

import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // check at page load if a user is authenticated
  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
