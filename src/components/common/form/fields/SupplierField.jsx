import { PropTypes } from "prop-types";
import React, { forwardRef, useEffect, useState } from "react";
import apiService from "../../../../services/apiService";
import httpService from "../../../../services/httpService";
import Autocomplete from "../../Autocomplete";

/**
 * Input with autocompletion to select a supplier URI.
 */
const SupplierField = forwardRef(({ value, onChange, ...props }, ref) => {
  const [supplier, setSupplier] = useState();

  // Every time the supplier changes pass its URI to onChange.
  useEffect(() => {
    onChange(supplier?._links.self.href);
  }, [supplier, onChange]);

  // Fetch and set the supplier by the provided URI;
  useEffect(() => {
    if (!value || supplier) return;

    const fetchInvoice = async () => {
      try {
        const { data } = await httpService.get(value);
        setSupplier(data);
      } catch (error) {
        console.error("Error while loading initial value.", error);
      }
    };

    fetchInvoice();
  }, [value, supplier]);

  //Options loader.
  const loadOptions = async (inputValue, callback) => {
    try {
      const { _embedded } = await apiService.searchByMethod(
        "suppliers",
        "findByNameContainingIgnoreCase",
        { name: inputValue }
      );
      callback(_embedded.suppliers);
    } catch (error) {
      alert("Errore: impossibile caricare opzioni.");
      console.error("Error while loading options.", error);
    }
  };

  return (
    <Autocomplete
      {...props}
      ref={ref}
      getOptionLabel={(supplier) => supplier.name}
      getOptionValue={(supplier) => supplier._links.self.href}
      value={supplier}
      loadOptions={loadOptions}
      onChange={setSupplier}
    />
  );
});

SupplierField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

SupplierField.defaultProps = {
  value: "",
};

export default SupplierField;
