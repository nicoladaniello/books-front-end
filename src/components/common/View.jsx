import classnames from "classnames";
import { navigate } from "gatsby";
import { PropTypes } from "prop-types";
import React from "react";
import { Col, Row } from "react-bootstrap";
import routes from "../../settings/routes";
import useAuth from "../auth/useAuth";
import Navbar from "../nav/Navbar";
import NavMenu from "../nav/NavMenu";

export const ViewTitle = ({ className, children, ...props }) => (
  <h1 {...props} className={classnames(className, "h4 mb-4")}>
    {children}
  </h1>
);

const View = ({ privateRoute, children }) => {
  const auth = useAuth();

  if (privateRoute && auth.isAnonymous) {
    navigate(routes.login);
    return "Redirecting...";
  }

  if (privateRoute && auth.isUnknown) return "Loading...";

  return (
    <div
      className="d-flex flex-column"
      style={{ height: "100vh", maxHeight: "100vh" }}
    >
      <Navbar />
      <Row noGutters className="fex-fill justify-content-center overflow-auto">
        <Col xs="2" className="no-print">
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
