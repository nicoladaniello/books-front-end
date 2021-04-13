import React from "react";
import View from "../components/common/View";
import PaymentView from "../components/payments/PaymentView";

const Payments = () => {
  return (
    <View privateRoute>
      <View.Title>Pagamenti</View.Title>
      <PaymentView />
    </View>
  );
};

export default Payments;
