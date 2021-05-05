import { Link } from "gatsby";
import React from "react";
import { Nav, Navbar as BSNavbar, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import routes from "../../settings/routes";
import useAuth from "../auth/useAuth";
import { openModal } from "../modals/slice";
import ConfirmShutdownModal from "./ConfirmShutdownModal";

const Navbar = (props) => {
  const { t, i18n } = useTranslation();
  const auth = useAuth();
  const dispatch = useDispatch();

  const shutdown = async () => {
    dispatch(openModal({ modal: ConfirmShutdownModal.modal }));
  };

  return (
    <>
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
            <NavDropdown title={i18n.language}>
              {i18n.languages.slice(1).map((lng) => (
                <NavDropdown.Item
                  key={lng}
                  onClick={() => i18n.changeLanguage(lng)}
                >
                  {lng}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown title={auth.user?.name || t("common.options")}>
              {auth.isAuthenticated && (
                <NavDropdown.Item as={Link} to={routes.logout}>
                  {t("common.logout")}
                </NavDropdown.Item>
              )}
              <NavDropdown.Item
                className="text-danger"
                onClick={() => shutdown()}
              >
                {t("common.shutdown")}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </BSNavbar.Collapse>
      </BSNavbar>
      <ConfirmShutdownModal />
    </>
  );
};

export default Navbar;
