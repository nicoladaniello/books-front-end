import React from "react";
import View from "../../../../components/common/View";
import PaymentView from "../../../../components/payments/PaymentView";

const PeriodPayments = () => {
  // useEffect(
  //   () =>
  //     void load({
  //       method: "findAllByPeriod",
  //       params: { period: period._links.self.href },
  //     }),
  //   [load, period]
  // );

  return (
    <View privateRoute>
      <View.Title>Pagamenti</View.Title>
      <PaymentView />
    </View>
  );
};

export default PeriodPayments;
