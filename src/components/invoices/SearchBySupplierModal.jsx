import React, { useState } from "react";
import { Button, Modal as BSModal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadEntities } from "./actions";
import { closeModal, setSearchParams } from "./slice";
import apiService from "../../services/apiService";
import Autocomplete from "../common/Autocomplete";
import Modal from "../common/modal/index";

const modal = "SearchBySupplierModal";

const SearchBySupplierModal = () => {
  const state = useSelector((state) => state.invoices.modals[modal]);
  const dispatch = useDispatch();
  const [supplier, setSupplier] = useState();

  const { isOpen } = state || {};

  // Update result and close the modal.
  const handleConfirm = async () => {
    dispatch(setSearchParams({ supplier }));
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
          Annulla
        </Button>
        <Button variant="primary" type="submit" onClick={handleConfirm}>
          Confirma
        </Button>
      </BSModal.Footer>
    </Modal>
  );
};

SearchBySupplierModal.modal = modal;

export default SearchBySupplierModal;
