import React from "react";
import { Navigate } from "react-router-dom";

import { useStateContext } from "@/context";
import Routes from "@/routes";

type Props = {
  children: React.ReactElement;
};

const ProtectedRoute = ({ children }: Props) => {
  const {
    state: { authUser },
  } = useStateContext();

  if (!authUser) {
    return <Navigate to={Routes.auth.login} replace />;
  }

  return children;
};

export default ProtectedRoute;
