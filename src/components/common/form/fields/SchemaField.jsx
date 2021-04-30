import { PropTypes } from "prop-types";
import React, { forwardRef } from "react";
import { FormControl } from "react-bootstrap";
import CurrencyField from "./CurrencyField";
import InvoiceField from "./InvoiceField";
import PhoneField from "./PhoneField";
import SupplierField from "./SupplierField";

const SchemaField = forwardRef(
  ({ name, type, format, value, ...props }, ref) => {
    switch (format) {
      case "currency":
        return (
          <CurrencyField {...props} ref={ref} name={name} value={value || ""} />
        );

      case "tel":
        return (
          <PhoneField {...props} ref={ref} name={name} value={value || ""} />
        );

      case "uri":
        switch (name) {
          case "supplier":
            return (
              <SupplierField {...props} ref={ref} name={name} value={value} />
            );

          case "invoice":
            return (
              <InvoiceField {...props} ref={ref} name={name} value={value} />
            );

          default:
            return (
              <FormControl
                {...props}
                ref={ref}
                name={name}
                type={format}
                value={value}
              />
            );
        }

      default:
        if (!format && type === "number") format = "number";
        return (
          <FormControl
            {...props}
            ref={ref}
            name={name}
            type={format}
            value={value || ""}
          />
        );
    }
  }
);

SchemaField.propTypes = {
  type: PropTypes.string,
  format: PropTypes.string,
};

SchemaField.defaultProps = {
  format: "text",
};

export default SchemaField;
