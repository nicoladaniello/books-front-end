import { Link } from "gatsby";
import React from "react";
import { Nav, Navbar as BSNavbar, NavDropdown } from "react-bootstrap";
import apiService from "../../services/apiService";
import routes from "../../settings/routes";
import useAuth from "../auth/useAuth";

const Navbar = (props) => {
  const auth = useAuth();

  const shutdown = async () => {
    try {
      await apiService.shutdown();
      alert("Il programma è terminato, è ora possible chiudere questa pagina.");
    } catch (error) {
      console.error("Error while shutting down the server.", error);
    }
  };

  return (
    <BSNavbar
      expand="sm"
      variant="light"
      bg="white"
      style={{ zIndex: 1 }}
      {...props}
    >
      <BSNavbar.Brand className="pl-2">Books</BSNavbar.Brand>
      <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BSNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavDropdown title={auth.user?.name || "Opzioni"}>
            {auth.isAuthenticated && (
              <NavDropdown.Item as={Link} to={routes.logout}>
                Disconnetti
              </NavDropdown.Item>
            )}
            <NavDropdown.Item onClick={() => shutdown()}>
              Termina
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </BSNavbar.Collapse>
    </BSNavbar>
  );
};

export default Navbar;
