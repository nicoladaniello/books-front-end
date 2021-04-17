import classnames from "classnames";
import { navigate } from "gatsby";
import { PropTypes } from "prop-types";
import React from "react";
import { Col, Row } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { authStatus } from "../../reducers/authSlice";
import routes from "../../settings/routes";
import NavMenu from '../NavMenu';
import Navbar from "./Navbar";

export const ViewTitle = ({ className, children, ...props }) => (
  <h1 {...props} className={classnames(className, "h4 mb-4")}>
    {children}
  </h1>
);

const View = ({ privateRoute, children }) => {
  const auth = useAuth();

  if (privateRoute && auth.status === authStatus.anonymous) {
    navigate(routes.login);
    return "Redirecting...";
  }

  if (privateRoute && auth.status === authStatus.unknown) return "Loading...";

  return (
    <div
      className="d-flex flex-column"
      style={{ height: "100vh", maxHeight: "100vh", overflow: "hidden" }}
    >
      <Navbar />
      <Row noGutters className="h-100">
        <Col xs="2">
          <NavMenu />
        </Col>
        <Col xs="10" className="h-100">
          {children}
        </Col>
      </Row>
    </div>
  );
};

View.Title = ViewTitle;

View.propTypes = {
  privateRoute: PropTypes.bool,
};

View.defaultProps = {
  privateRoute: false,
};

export default View;
