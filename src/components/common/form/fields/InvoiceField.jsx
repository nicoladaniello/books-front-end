import React, { forwardRef } from "react";
import { components } from "react-select";
import apiService from '../../../../services/apiService';
import EntityUrlField from "./EntityUrlField";

/**
 * Custom options menu for the select input field.
 * Displays the invoice's supplier name on top of the invoice description.
 */
const Option = (props) => {
  return (
    <>
      <p className="text-muted small mb-0 pl-2">
        <small>{props.data.supplierName}</small>
      </p>
      <components.Option {...props} />
    </>
  );
};

/**
 * Input field with autocompletion for invoices.
 * Returns the URL of the selected invoice as value.
 */
const InvoiceField = forwardRef((props, ref) => {
  // Options loader function.
  const loadOptions = async (inputValue, callback) => {
    try {
      const { _embedded } = await apiService.searchByMethod(
        "invoices",
        "findByDescriptionContainingIgnoreCase",
        {
          description: inputValue,
        }
      );
      callback(_embedded.invoices);
    } catch (error) {
      alert("Errore: impossibile caricare opzioni.");
      console.error("Error while loading options.", error);
    }
  };

  return (
    <EntityUrlField
      {...props}
      ref={ref}
      getOptionLabel={(invoice) => invoice.description}
      loadOptions={loadOptions}
      components={{ Option }}
    />
  );
});

export default InvoiceField;
