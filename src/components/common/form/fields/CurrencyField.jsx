import React, { forwardRef } from "react";
import { FormControl } from "react-bootstrap";
import NumberFormat from "react-number-format";

const CurrencyField = forwardRef(({ onChange, ...props }, ref) => {
  return (
    <NumberFormat
      {...props}
      ref={ref}
      thousandSeparator
      customInput={FormControl}
      onValueChange={({ floatValue }) => onChange(floatValue)}
      prefix={process.env.LOCAL_CURRENCY_SYMBOL}
    />
  );
});

export default CurrencyField;
