import { PropTypes } from "prop-types";
import React, { forwardRef } from "react";
import { FormControl } from "react-bootstrap";
import CurrencyField from "./CurrencyField";
import InvoiceField from "./InvoiceField";
import PhoneField from "./PhoneField";
import SupplierField from "./SupplierField";

const SchemaField = forwardRef(({ type, format, value, ...props }, ref) => {
  switch (format) {
    case "currency":
      return <CurrencyField {...props} ref={ref} value={value || ""} />;

    case "tel":
      return <PhoneField {...props} ref={ref} value={value || ""} />;

    case "supplier":
      return <SupplierField {...props} ref={ref} value={value || ""} />;

    case "invoice":
      return <InvoiceField {...props} ref={ref} value={value || ""} />;

    default:
      if (!format && type === "number") format = "number";
      return (
        <FormControl {...props} ref={ref} type={format} value={value || ""} />
      );
  }
});

SchemaField.propTypes = {
  type: PropTypes.string,
  format: PropTypes.string,
};

SchemaField.defaultProps = {
  format: "text",
};

export default SchemaField;
