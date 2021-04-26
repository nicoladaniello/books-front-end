import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../common/modal/ConfirmationModal";
import { remove } from "./actions";
import { closeModal } from "./slice";

const modal = "DeleteSupplierModal";

const DeleteSupplierModal = () => {
  const state = useSelector((state) => state.suppliers.modals[modal]);
  const dispatch = useDispatch();

  const { isOpen, props: { supplier } = {} } = state || {};

  // Update result and close the modal.
  const handleConfirm = async () => {
    try {
      const result = await dispatch(remove(supplier));
      unwrapResult(result);
      dispatch(closeModal(modal));
    } catch (error) {
      alert("Errore durante l'eliminazione della fattura.");
      console.error("An error occurred while deleting the supplier.", error);
    }
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onConfirm={handleConfirm}
      onDismiss={() => dispatch(closeModal(modal))}
    >
      Sei sicuro di voler eliminare il fornitore "{supplier?.name}"?
    </ConfirmationModal>
  );
};

DeleteSupplierModal.modal = modal;

export default DeleteSupplierModal;
