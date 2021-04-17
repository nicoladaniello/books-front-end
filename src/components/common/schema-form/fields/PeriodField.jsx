import React, { forwardRef } from "react";
import apiService from "../../../../services/apiService";
import Autocomplete from "../../Autocomplete";

const PeriodField = forwardRef(({ defaultValue, onChange, ...props }, ref) => {
  // Loader
  const loadOptions = async (inputValue, callback) => {
    try {
      const { _embedded } = await apiService.searchByMethod({
        resource: "periods",
        method: "findByNameContainingIgnoreCase",
        params: {
          name: inputValue,
        },
      });
      callback(_embedded.periods);
    } catch (ex) {
      alert("Errore: impossibile caricare periodi.");
      console.error("Error while loading periods.", ex);
    }
  };

  return (
    <Autocomplete
      {...props}
      ref={ref}
      loadOptions={loadOptions}
      getOptionLabel={(period) => period.name}
      getOptionValue={(period) => period.id}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
});

export default PeriodField;
