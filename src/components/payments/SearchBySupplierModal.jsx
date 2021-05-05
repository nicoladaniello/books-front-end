import React, { useState } from "react";
import { Button, Modal as BSModal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import apiService from "../../services/apiService";
import Autocomplete from "../common/Autocomplete";
import Modal from "../common/modal/index";
import { closeModal } from "../modals/slice";
import { loadEntities } from "./actions";
import { setSearchParams } from "./slice";

const modal = "SearchBySupplierModal";

const SearchBySupplierModal = () => {
  const { t } = useTranslation();
  const state = useSelector((state) => state.modals[modal]);
  const dispatch = useDispatch();
  const [supplier, setSupplier] = useState();

  const { isOpen } = state || {};

  // Update result and close the modal.
  const handleConfirm = async () => {
    dispatch(setSearchParams({ supplier, invoice: undefined }));
    dispatch(loadEntities());
    dispatch(closeModal(modal));
  };

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
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal(modal))}>
      <BSModal.Body>
        <Autocomplete
          getOptionLabel={(supplier) => supplier.name}
          getOptionValue={(supplier) => supplier.id}
          value={supplier}
          loadOptions={loadOptions}
          onChange={setSupplier}
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

SearchBySupplierModal.modal = modal;

export default SearchBySupplierModal;
