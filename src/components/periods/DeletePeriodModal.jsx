import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../common/modal/ConfirmationModal";
import { closeModal } from "../modals/slice";
import { remove } from "./actions";

const modal = "DeletePeriodModal";

const DeletePeriodModal = () => {
  const state = useSelector((state) => state.modals[modal]);
  const dispatch = useDispatch();

  const { isOpen, props: { period } = {} } = state || {};

  // Update result and close the modal.
  const handleConfirm = async () => {
    try {
      const result = await dispatch(remove(period));
      unwrapResult(result);
      dispatch(closeModal(modal));
    } catch (error) {
      alert("Errore durante l'eliminazione del periodo.");
      console.error("An error occurred while deleting the period.", error);
    }
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onConfirm={handleConfirm}
      onDismiss={() => dispatch(closeModal(modal))}
    >
      Sei sicuro di voler eliminare il periodo "{period?.name}"?
    </ConfirmationModal>
  );
};

DeletePeriodModal.modal = modal;

export default DeletePeriodModal;
