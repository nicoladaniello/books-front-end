import React from "react";
import View from "../../../components/common/View";
import InvoiceView from "../../../components/invoices/InvoiceView";

const PeriodInvoices = () => {
  // useEffect(
  //   () =>
  //     void load({
  //       method: "findAllByPeriod",
  //       params: { period: period._links?.self?.href },
  //     }),
  //   [load, period]
  // );

  return (
    <View privateRoute>
      <View.Title>Fatture</View.Title>
      <InvoiceView />
    </View>
  );
};

export default PeriodInvoices;
