import React from "react";
import { navigate } from "gatsby";
import useAuth from "../components/auth/useAuth";
import routes from "../settings/routes";
import Spinner from "../components/common/Spinner";

const IndexPage = () => {
  const { isAuthenticated, isAnonymous } = useAuth();

  if (isAuthenticated) {
    navigate(routes.home);
  } else if (isAnonymous) {
    navigate(routes.login);
  }

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <div className="m-auto text-center">
        <Spinner className="mb-2" />
        <p>Caricando...</p>
      </div>
    </div>
  );
};

export default IndexPage;
