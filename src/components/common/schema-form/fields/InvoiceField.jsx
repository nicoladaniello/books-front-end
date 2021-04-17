import React, { forwardRef } from "react";
import { components } from "react-select";
import apiService from "../../../../services/apiService";
import Autocomplete from "../../Autocomplete";

// Displays the invoice's supplier name in the select options.
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
 *
 */
const InvoiceField = forwardRef(
  ({ defaultValue, supplier, onChange, ...props }, ref) => {
    // Loader
    const loadOptions = async (inputValue, callback) => {
      try {
        const { _embedded } = await apiService.searchByMethod({
          resource: "invoices",
          method: supplier
            ? "findBySupplierAndDescriptionContainingIgnoreCase"
            : "findByDescriptionContainingIgnoreCase",
          params: {
            description: inputValue,
            supplier: supplier?._links.self.href,
          },
        });
        callback(_embedded.invoices);
      } catch (ex) {
        alert("Errore: impossibile caricare fornitori.");
        console.error("Error while loading suppliers.", ex);
      }
    };

    return (
      <Autocomplete
        {...props}
        ref={ref}
        components={{ Option }}
        loadOptions={loadOptions}
        getOptionLabel={(invoice) => invoice.description}
        getOptionValue={(invoice) => invoice.id}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    );
  }
);

export default InvoiceField;
