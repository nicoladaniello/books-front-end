import React from "react";
import View from "../components/common/View";
import InvoiceView from "../components/invoices/InvoiceView";

const Invoices = () => {
  return (
    <View privateRoute>
      <View.Title>Fatture</View.Title>
      <InvoiceView />
    </View>
  );
};

export default Invoices;
