import { navigate } from "gatsby";
import useAuth from "../hooks/useAuth";
import { authStatus } from '../reducers/authSlice';
import routes from "../settings/routes";

const IndexPage = () => {
  const { status } = useAuth();

  if (status === authStatus.authenticated) {
    navigate(routes.home);
  } else if (status === authStatus.anonymous) {
    navigate(routes.login);
  } else return "Loading...";

  return null;
};

export default IndexPage;
