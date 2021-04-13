import React, { forwardRef } from "react";
import useResource from "../../../../hooks/useResource";
import Autocomplete from "../../Autocomplete";

const SupplierField = forwardRef(
  ({ defaultValue, onChange, ...props }, ref) => {
    const suppliers = useResource("suppliers");

    // Loader
    const loadOptions = async (inputValue, callback) => {
      try {
        const { entities } = await suppliers.search(
          "findByNameContainingIgnoreCase",
          {
            name: inputValue,
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
        getOptionLabel={(supplier) => supplier.name}
        getOptionValue={(supplier) => supplier.id}
        onChange={onChange}
      />
    );
  }
);

export default SupplierField;
