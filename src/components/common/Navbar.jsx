import { Link } from "gatsby";
import React from "react";
import { Nav, Navbar as BSNavbar, NavDropdown } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { authStatus } from '../../reducers/authSlice';
import routes from "../../settings/routes";

const Navbar = (props) => {
  const auth = useAuth();

  return (
    <BSNavbar
      expand="sm"
      variant="light"
      bg="light"
      style={{ zIndex: 1 }}
      {...props}
    >
      <BSNavbar.Brand>Books</BSNavbar.Brand>
      <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BSNavbar.Collapse id="basic-navbar-nav">
        {auth.status === authStatus.authenticated && (
          <>
            <Nav className="ml-auto">
              <Nav.Link as={Link} active to="/">
                Contabilità
              </Nav.Link>
              <Nav.Link as={Link} disabled to="/">
                Magazzino
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <NavDropdown title={auth.user.name}>
                <NavDropdown.Item as={Link} to={routes.profile}>
                  Modifica profilo
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={routes.logout}>
                  Disconnetti
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </>
        )}
      </BSNavbar.Collapse>
    </BSNavbar>
  );
};

export default Navbar;
