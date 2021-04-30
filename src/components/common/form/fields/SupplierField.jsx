import React, { forwardRef } from "react";
import apiService from "../../../../services/apiService";
import EntityUrlField from "./EntityUrlField";

/**
 * Input with autocompletion to select a supplier URI.
 */
const SupplierField = forwardRef((props, ref) => {
  // Options loader function.
  const loadOptions = async (inputValue, callback) => {
    try {
      const { _embedded } = await apiService.searchByMethod(
        "suppliers",
        "findByNameContainingIgnoreCase",
        {
          name: inputValue,
        }
      );
      callback(_embedded.suppliers);
    } catch (error) {
      alert("Errore: impossibile caricare opzioni.");
      console.error("Error while loading options.", error);
    }
  };

  return (
    <EntityUrlField
      {...props}
      ref={ref}
      getOptionLabel={(supplier) => supplier.name}
      loadOptions={loadOptions}
    />
  );
});

export default SupplierField;
