import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import schema from "../../settings/schemas/suppliers";
import FormModal from "../common/modal/FormModal";
import { closeModal } from "../modals/slice";
import { upsert } from "./actions";

const modal = "UpsertSupplierModal";

const UpsertSupplierModal = () => {
  const state = useSelector((state) => state.modals[modal]);
  const dispatch = useDispatch();

  const { isOpen, props: { supplier } = {} } = state || {};

  // Update result and close the modal.
  const handleConfirm = async (updatedSupplier) => {
    try {
      const result = await dispatch(upsert(updatedSupplier));
      unwrapResult(result);
      dispatch(closeModal(modal));
    } catch (error) {
      alert("Errore durante la modifica.");
      console.error("An error occurred in the upsert dispatch.", error);
    }
  };

  return (
    <FormModal
      schema={schema}
      isOpen={isOpen}
      defaultValues={supplier}
      onConfirm={handleConfirm}
      onDismiss={() => dispatch(closeModal(modal))}
    />
  );
};

UpsertSupplierModal.modal = modal;

export default UpsertSupplierModal;
