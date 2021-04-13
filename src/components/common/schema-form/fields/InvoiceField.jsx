import React, { forwardRef } from "react";
import useResource from "../../../../hooks/useResource";
import Autocomplete from "../../Autocomplete";

const InvoiceField = forwardRef(({ defaultValue, onChange, ...props }, ref) => {
  const invoices = useResource("invoices");

  // Loader
  const loadOptions = async (inputValue, callback) => {
    try {
      const { entities } = await invoices.search(
        "findByDescriptionContainingIgnoreCase",
        {
          description: inputValue,
        }
      );
      callback(entities);
    } catch (ex) {
      alert("Errore: impossibile caricare fornitori.");
      console.error("Error while loading suppliers.", ex);
    }
  };

  return (
    <Autocomplete
      {...props}
      ref={ref}
      loadOptions={loadOptions}
      getOptionLabel={(invoice) => invoice.description}
      getOptionValue={(invoice) => invoice.id}
      onChange={onChange}
    />
  );
});

export default InvoiceField;
