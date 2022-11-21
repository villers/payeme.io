import React from "react";

import LoadingScreen from "@/components/LoadingSreeen";
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
    return <LoadingScreen />;
  }

  return children;
};

export default AuthMiddleware;
