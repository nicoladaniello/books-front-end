import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import schema from "../../settings/schemas/periods";
import FormModal from "../common/modal/FormModal";
import { closeModal } from "../modals/slice";
import { upsert } from "./actions";

const modal = "UpsertPeriodModal";

const UpsertPeriodModal = () => {
  const state = useSelector((state) => state.modals[modal]);
  const dispatch = useDispatch();

  const { isOpen, props: { period } = {} } = state || {};

  // Update result and close the modal.
  const handleConfirm = async (updatedPeriod) => {
    try {
      const result = await dispatch(upsert(updatedPeriod));
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
      defaultValues={period}
      onConfirm={handleConfirm}
      onDismiss={() => dispatch(closeModal(modal))}
    />
  );
};

UpsertPeriodModal.modal = modal;

export default UpsertPeriodModal;
