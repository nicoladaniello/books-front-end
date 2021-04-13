import React from "react";
import { Card } from "react-bootstrap";
import Pagination from "../../../components/common/Pagination";
import Table from "../../../components/common/table/Table";
import View from "../../../components/common/View";

const PeriodSummary = () => {
  // useEffect(() => {
  //   if (!period) {
  //     navigate(routes.periods);
  //   } else
  //     load({
  //       method: "findAllByPeriod",
  //       params: { period: period._links.self.href },
  //     });
  // }, [load, period]);

  /**
   * View invoices for current supplier in current period.
   *
   * @param {object} period  - The period to inspect.
   */
  const view = (summary) => {
    // selectSupplierSummary(summary);
    // navigate(routes.PeriodSupplierInvoices);
  };

  /**
   * Actions for the table context menu.
   */
  const tableContextActions = [{ label: "Visualizza fatture", onClick: view }];

  /**
   * UI
   */
  return (
    <View privateRoute>
      <View.Title>Situazione Fornitori</View.Title>
      <div className="col-lg-9 mx-lg-auto mb-4">{/* <FilterField /> */}</div>
      <Card>
        <Card.Header>
          <h6 className="mb-0">Risultati</h6>
        </Card.Header>
        <Card.Body>
          <Table actions={tableContextActions} />
          <Pagination />
        </Card.Body>
      </Card>
    </View>
  );
};

export default PeriodSummary;
