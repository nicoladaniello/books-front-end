import React, { forwardRef } from "react";
import apiService from "../../../../services/apiService";
import Autocomplete from "../../Autocomplete";

const SupplierField = forwardRef(
  ({ defaultValue, onChange, ...props }, ref) => {
    // Loader
    const loadOptions = async (inputValue, callback) => {
      try {
        const { _embedded } = await apiService.searchByMethod({
          resource: "suppliers",
          method: "findByNameContainingIgnoreCase",
          params: {
            name: inputValue,
          },
        });
        callback(_embedded.suppliers);
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
        getOptionLabel={(supplier) => supplier.name}
        getOptionValue={(supplier) => supplier.id}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    );
  }
);

export default SupplierField;
