import { Link } from "gatsby";
import React from "react";
import { Card, Dropdown, Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import routes from "../../settings/routes";
import Icon from "../common/Icon";
import { openModal as openInvoicesModal } from "../invoices/slice";
import UpsertInvoiceModal from "../invoices/UpsertInvoiceModal";
import { openModal as openPaymentsModal } from "../payments/slice";
import UpsertPaymentModal from "../payments/UpsertPaymentModal";
import { openModal as openPeriodModal } from "../periods/slice";
import UpsertPeriodModal from "../periods/UpsertPeriodModal";
import { openModal as openSupplierModal } from "../suppliers/slice";
import UpsertSupplierModal from "../suppliers/UpsertSupplierModal";

const NavMenu = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handlePrint = (e) => {
    e.preventDefault();
    if (window) window.print();
  };

  return (
    <Card className="border-0">
      <UpsertInvoiceModal />
      <UpsertPaymentModal />
      <UpsertPeriodModal />
      <UpsertSupplierModal />
      <Card.Body className="pl-2 py-3">
        <Dropdown>
          <Dropdown.Toggle block className="d-flex no-caret pl-0 shadow-sm">
            <Icon className="col-4 text-center" icon="plus" />
            <span className="pl-2">{t("common.insert")}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              className="d-flex"
              onClick={() =>
                dispatch(openPeriodModal({ modal: UpsertPeriodModal.modal }))
              }
            >
              <Icon className="col-2" icon="calendar-alt" />
              <span className="col-10">{t("modules.period.insert")}</span>
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex"
              onClick={() =>
                dispatch(
                  openSupplierModal({ modal: UpsertSupplierModal.modal })
                )
              }
            >
              <Icon className="col-2" icon="truck" />
              <span className="col-10">{t("modules.supplier.insert")}</span>
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex"
              onClick={() =>
                dispatch(openInvoicesModal({ modal: UpsertInvoiceModal.modal }))
              }
            >
              <Icon className="col-2" icon="file-invoice" />
              <span className="col-10">{t("modules.invoice.insert")}</span>
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex"
              onClick={() =>
                dispatch(openPaymentsModal({ modal: UpsertPaymentModal.modal }))
              }
            >
              <Icon className="col-2" icon="credit-card" />
              <span className="col-10">{t("modules.payment.insert")}</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
      <Nav className="flex-column" variant="pills" role="tablist">
        <Nav.Link
          className="d-flex"
          activeClassName="active"
          role="tab"
          as={Link}
          to={routes.periods}
        >
          <Icon className="col-4 text-center" icon="calendar-alt" />
          <span>{t("common.periods")}</span>
        </Nav.Link>
        <Nav.Link
          className="d-flex"
          activeClassName="active"
          role="tab"
          as={Link}
          to={routes.suppliers}
        >
          <Icon className="col-4 text-center" icon="truck" />
          <span>{t("common.suppliers")}</span>
        </Nav.Link>
        <Nav.Link
          className="d-flex"
          activeClassName="active"
          role="tab"
          as={Link}
          to={routes.summary}
        >
          <Icon className="col-4 text-center" icon="calendar-alt" />
          <span>{t("common.summary")}</span>
        </Nav.Link>
        <Nav.Link
          className="d-flex"
          activeClassName="active"
          role="tab"
          as={Link}
          to={routes.invoices}
        >
          <Icon className="col-4 text-center" icon="file-invoice" />
          <span>{t("common.invoices")}</span>
        </Nav.Link>
        <Nav.Link
          className="d-flex"
          activeClassName="active"
          role="tab"
          as={Link}
          to={routes.payments}
        >
          <Icon className="col-4 text-center" icon="credit-card" />
          <span>{t("common.payments")}</span>
        </Nav.Link>
      </Nav>
      <hr />
      <Nav className="flex-column" variant="pills" role="tablist">
        <Nav.Link className="d-flex" role="button" onClick={handlePrint}>
          <Icon className="col-4 text-center" icon="print" />
          <span>{t("common.print")}</span>
        </Nav.Link>
      </Nav>
    </Card>
  );
};

export default NavMenu;
