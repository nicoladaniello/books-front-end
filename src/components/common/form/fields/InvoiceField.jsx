import { PropTypes } from 'prop-types';
import React, { forwardRef, useEffect, useState } from "react";
import { components } from "react-select";
import apiService from '../../../../services/apiService';
import httpService from "../../../../services/httpService";
import Autocomplete from '../../Autocomplete';

/**
 * Custom options menu to display the invoice's
 * supplier name on top of the invoice description.
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
 * Input with autocompletion to select a invoice URI.
 */
const InvoiceField = forwardRef(({ value, onChange, ...props }, ref) => {
  const [invoice, setInvoice] = useState();

  // Every time the invoice changes pass its URI to onChange.
  useEffect(() => {
    onChange(invoice?._links.self.href);
  }, [invoice, onChange]);

  // Fetch and set the invoice by the provided URI;
  useEffect(() => {
    if (!value || invoice) return;

    const fetchInvoice = async () => {
      try {
        const { data } = await httpService.get(value);
        setInvoice(data);
      } catch (error) {
        console.error("Error while loading initial value.", error);
      }
    };

    fetchInvoice();
  }, [value, invoice]);

  //Options loader.
  const loadOptions = async (inputValue, callback) => {
    try {
      const { _embedded } = await apiService.searchByMethod(
        "invoices",
        "findByDescriptionContainingIgnoreCase",
        { description: inputValue }
      );
      callback(_embedded.invoices);
    } catch (error) {
      alert("Errore: impossibile caricare opzioni.");
      console.error("Error while loading options.", error);
    }
  };

  return (
    <Autocomplete
      {...props}
      ref={ref}
      components={{ Option }}
      getOptionLabel={(invoice) => invoice.description}
      getOptionValue={(invoice) => invoice._links.self.href}
      value={invoice}
      loadOptions={loadOptions}
      onChange={setInvoice}
    />
  );
});

InvoiceField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

InvoiceField.defaultProps = {
  value: "",
};

export default InvoiceField;
