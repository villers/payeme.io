import React from "react";

import { useStateContext } from "@/context";
import { auth } from "@/firebase/config";
import { useAuthStateChanged } from "@/services/firebase/auth/AuthHook";

type AuthMiddlewareProps = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const { dispatch } = useStateContext();

  const query = useAuthStateChanged(["authUser"], auth, {
    onSuccess: (data) => {
      dispatch({ type: "SET_USER", payload: data });
    },
  });

  if (query.isLoading) {
    return <div>Loading auth</div>;
  }

  return children;
};

export default AuthMiddleware;