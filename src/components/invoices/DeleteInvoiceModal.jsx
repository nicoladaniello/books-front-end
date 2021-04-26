import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from '../common/modal/ConfirmationModal';
import { remove } from "./actions";
import { closeModal } from "./slice";

const modal = "DeleteInvoiceModal";

const DeleteInvoiceModal = () => {
  const state = useSelector((state) => state.invoices.modals[modal]);
  const dispatch = useDispatch();

  const { isOpen, props: { invoice } = {} } = state || {};

  // Update result and close the modal.
  const handleConfirm = async () => {
    try {
      const result = await dispatch(remove(invoice));
      unwrapResult(result);
      dispatch(closeModal(modal));
    } catch (error) {
      alert("Errore durante l'eliminazione della fattura.");
      console.error("An error occurred while deleting the invoice.", error);
    }
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onConfirm={handleConfirm}
      onDismiss={() => dispatch(closeModal(modal))}
    >
      Sei sicuro di voler eliminare la fattura "{invoice?.description}"?
    </ConfirmationModal>
  );
};

DeleteInvoiceModal.modal = modal;

export default DeleteInvoiceModal;
