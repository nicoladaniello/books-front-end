import React from "react";
import View from "../../../../components/common/View";
import InvoiceView from "../../../../components/invoices/InvoiceView";

const PeriodSupplierInvoices = () => {
  // const summary = useSummary();

  // const period = summary.state.period?.value;
  // const supplierSummary = summary.state?.period?.supplierSummary?.value;

  // TODO: Fix this mess by getting the supplier directly from the backend.
  // const url = supplierSummary._links?.self?.href?.split("/");
  // const supplierId = url ? url[url.length - 1] : "";
  // const supplier = `${process.env.API_URL}/${process.env.SUPPLIERS_ENDPOINT}/${supplierId}`;

  // useEffect(() => {
  //   load({
  //     method: "findAllBySupplierAndPeriod",
  //     params: {
  //       supplier,
  //       period: period._links?.self?.href,
  //     },
  //   });
  // }, [load, period, supplier]);

  return (
    <View privateRoute>
      <View.Title>Fatture</View.Title>
      <InvoiceView />
    </View>
  );
};

export default PeriodSupplierInvoices;
