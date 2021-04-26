import { navigate } from "gatsby";
import React, { useEffect } from "react";
import useAuth from "../components/auth/useAuth";
import routes from "../settings/routes";

const Logout = () => {
  const { isAuthenticated, isAnonymous, logout } = useAuth();

  useEffect(() => {
    if (isAuthenticated) logout();
    else if (isAnonymous) navigate(routes.login);
  }, [isAuthenticated, isAnonymous, logout]);

  return <div>Logging you out...</div>;
};

export default Logout;
