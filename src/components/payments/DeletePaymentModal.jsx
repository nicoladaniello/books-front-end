import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../common/modal/ConfirmationModal";
import { closeModal } from "../modals/slice";
import { remove } from "./actions";

const modal = "DeletePaymentModal";

const DeletePaymentModal = () => {
  const state = useSelector((state) => state.modals[modal]);
  const dispatch = useDispatch();

  const { isOpen, props: { payment } = {} } = state || {};

  // Update result and close the modal.
  const handleConfirm = async () => {
    try {
      const result = await dispatch(remove(payment));
      unwrapResult(result);
      dispatch(closeModal(modal));
    } catch (error) {
      alert("Errore durante l'eliminazione del pagamento.");
      console.error("An error occurred while deleting the payment.", error);
    }
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onConfirm={handleConfirm}
      onDismiss={() => dispatch(closeModal(modal))}
    >
      Sei sicuro di voler eliminare il pagamento "{payment?.description}"?
    </ConfirmationModal>
  );
};

DeletePaymentModal.modal = modal;

export default DeletePaymentModal;
