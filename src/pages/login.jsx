import { navigate } from "gatsby";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LoginForm from "../components/login/LoginForm";
import UserList from "../components/login/UserList";
import useAuth from "../hooks/useAuth";
import { authStatus } from "../reducers/authSlice";
import routes from "../settings/routes";

/**
 * Login View
 */
const Login = () => {
  const { status } = useAuth();
  const [user, setUser] = useState();

  useEffect(() => {
    if (status === authStatus.authenticated) navigate(routes.home);
  }, [status]);

  /**
   * If the user is already logged in redirects to the homepage.
   */

  /**
   * UI
   */
  return (
    <Container fluid className="d-flex text-center">
      <div className="m-auto">
        <h5 className="mb-0">Benvenuto in</h5>
        <h1 className="display-3 font-weight-bold mb-4">Books</h1>
        <h2 className="mb-2">Accedi</h2>

        {!user && <UserList onSelect={setUser} />}
        {!!user && <LoginForm user={user} onDismiss={setUser} />}
      </div>
    </Container>
  );
};

export default Login;
