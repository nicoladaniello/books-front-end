import React, { forwardRef } from "react";
import { FormControl } from "react-bootstrap";
import NumberFormat from "react-number-format";

const PhoneField = forwardRef(({ onChange, ...props }, ref) => {
  return (
    <NumberFormat
      {...props}
      ref={ref}
      customInput={FormControl}
      onValueChange={({ floatValue }) => onChange(floatValue)}
      format="#### #### #### ####"
    />
  );
});

export default PhoneField;
