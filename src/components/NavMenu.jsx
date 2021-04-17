import { Link } from "gatsby";
import React from "react";
import { Card, Dropdown, Nav } from "react-bootstrap";
import useModal from "../hooks/useModal";
import routes from "../settings/routes";
import Icon from "./common/Icon";

const NavMenu = () => {
  const modal = useModal();

  const handleInsert = (resource) => {
    modal.upsertEntity({ resource });
  };

  return (
    <Card className="border-0">
      <Card.Body className="pl-2">
        <Dropdown>
          <Dropdown.Toggle block className="d-flex no-caret pl-0 shadow-sm">
            <Icon className="col-4 text-center" icon="plus" />
            <span className="pl-2">Aggiungi</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              className="d-flex"
              onClick={() => handleInsert("periods")}
            >
              <Icon className="col-2" icon="calendar-alt" />
              <span className="col-10">Aggiungi periodo</span>
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex"
              onClick={() => handleInsert("suppliers")}
            >
              <Icon className="col-2" icon="truck" />
              <span className="col-10">Aggiungi fornitore</span>
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex"
              onClick={() => handleInsert("invoices")}
            >
              <Icon className="col-2" icon="file-invoice" />
              <span className="col-10">Aggiungi fattura</span>
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex"
              onClick={() => handleInsert("payments")}
            >
              <Icon className="col-2" icon="credit-card" />
              <span className="col-10">Aggiungi pagamento</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
      <Nav className="flex-column" variant="pills" role="tablist">
        <Nav.Link
          className="d-flex"
          activeClassName="active"
          as={Link}
          to={routes.periods}
          role="tab"
        >
          <Icon className="col-4 text-center" icon="calendar-alt" />
          <span>Periodi</span>
        </Nav.Link>
        <Nav.Link
          className="d-flex"
          activeClassName="active"
          as={Link}
          to={routes.suppliers}
          role="tab"
        >
          <Icon className="col-4 text-center" icon="truck" />
          <span>Fornitori</span>
        </Nav.Link>
        <Nav.Link
          className="d-flex"
          activeClassName="active"
          as={Link}
          to={routes.invoices}
          role="tab"
        >
          <Icon className="col-4 text-center" icon="file-invoice" />
          <span>Fatture</span>
        </Nav.Link>
        <Nav.Link
          className="d-flex"
          activeClassName="active"
          as={Link}
          to={routes.payments}
          role="tab"
        >
          <Icon className="col-4 text-center" icon="credit-card" />
          <span>Pagamenti</span>
        </Nav.Link>
      </Nav>
    </Card>
  );
};

export default NavMenu;
