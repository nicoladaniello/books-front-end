import React, { useState } from "react";
import { Button, Modal as BSModal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { components } from "react-select";
import apiService from "../../services/apiService";
import Autocomplete from "../common/Autocomplete";
import Modal from "../common/modal/index";
import { closeModal } from "../modals/slice";
import { loadEntities } from "./actions";
import { setSearchParams } from "./slice";

const modal = "SearchByInvoiceModal";

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

const SearchByInvoiceModal = () => {
  const { t } = useTranslation();
  const state = useSelector((state) => state.modals[modal]);
  const dispatch = useDispatch();
  const [invoice, setInvoice] = useState();

  const { isOpen } = state || {};

  // Update result and close the modal.
  const handleConfirm = async () => {
    dispatch(setSearchParams({ invoice, supplier: undefined }));
    dispatch(loadEntities());
    dispatch(closeModal(modal));
  };

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
      alert(t("messages.unexpectedError"));
      console.error("Error while loading options.", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal(modal))}>
      <BSModal.Body>
        <Autocomplete
          components={{ Option }}
          getOptionLabel={(invoice) => invoice.description}
          getOptionValue={(invoice) => invoice.id}
          value={invoice}
          loadOptions={loadOptions}
          onChange={setInvoice}
        />
      </BSModal.Body>

      <BSModal.Footer>
        <Button variant="light" onClick={() => dispatch(closeModal(modal))}>
          {t("common.dismiss")}
        </Button>
        <Button variant="primary" type="submit" onClick={handleConfirm}>
          {t("common.confirm")}
        </Button>
      </BSModal.Footer>
    </Modal>
  );
};

SearchByInvoiceModal.modal = modal;

export default SearchByInvoiceModal;
