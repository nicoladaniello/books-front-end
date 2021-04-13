import React from "react";
import { Card } from "react-bootstrap";
import useSummary from "../../../hooks/useSummary";
import routes from "../../../settings/routes";
import "./nav-menu.scss";
import NavMenuItem from "./NavMenuItem";

const NavMenu = () => {
  const { period, supplier } = useSummary();

  return (
    <Card className="h-100 bg-transparent border-0 small pb-2">
      <div className="mb-3">
        <h6 className="small text-uppercase text-muted mb-1">Generale</h6>
        <ul className="directory-list">
          <NavMenuItem isFolder label="Periodi" to={routes.periods} />
          <NavMenuItem label="Fornitori" to={routes.suppliers} />
          <NavMenuItem label="Fatture" to={routes.invoices} />
          <NavMenuItem label="Pagamenti" to={routes.payments} />
        </ul>
      </div>

      <h6 className="small text-uppercase text-muted mb-1">Situazioni</h6>
      {!!period && (
        <ul className="directory-list">
          <NavMenuItem isFolder label={period.name}>
            <ul>
              <NavMenuItem
                label="Situazione fornitori"
                to={routes.periodSummary}
              />
              <NavMenuItem label="Fatture" to={routes.PeriodInvoices} />
              <NavMenuItem label="Pagamenti" to={routes.PeriodPayments} />
              {!!supplier && (
                <NavMenuItem isFolder label={supplier.supplierName}>
                  <ul>
                    <NavMenuItem
                      label="Fatture"
                      to={routes.PeriodSupplierInvoices}
                    >
                      <ul>
                        <NavMenuItem
                          label="Pagamenti"
                          to={routes.PeriodSupplierPayments}
                        />
                      </ul>
                    </NavMenuItem>
                    <NavMenuItem
                      label="Pagamenti"
                      to={routes.PeriodSupplierPayments}
                    />
                  </ul>
                </NavMenuItem>
              )}
            </ul>
          </NavMenuItem>
        </ul>
      )}
    </Card>
  );
};

export default NavMenu;
