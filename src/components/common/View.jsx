import classnames from "classnames";
import { navigate } from "gatsby";
import { PropTypes } from "prop-types";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { authStatus } from '../../reducers/authSlice';
import routes from "../../settings/routes";
import NavMenu from "./menu/NavMenu";

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
    <Container fluid>
      <Row noGutters className="w-100 h-100">
        <Col xs="2">
          <NavMenu />
        </Col>
        <Col xs="10">
          <Container fluid className="pt-2">
            <Card className="border-0 shadow">
              <Card.Body className="p-3">{children}</Card.Body>
            </Card>
          </Container>
        </Col>
      </Row>
    </Container>
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
