import { navigate } from "gatsby";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { authStatus } from '../reducers/authSlice';
import routes from "../settings/routes";

const Logout = () => {
  const { status, logout } = useAuth();

  useEffect(() => {
    if (status === authStatus.authenticated) logout();
    else if (status === authStatus.anonymous) navigate(routes.login);
  }, [status, logout]);

  return <div>Logging you out...</div>;
};

export default Logout;
