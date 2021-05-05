import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import schema from "../../settings/schemas/payments";
import FormModal from "../common/modal/FormModal";
import { closeModal } from "../modals/slice";
import { upsert } from "./actions";

const modal = "UpsertPaymentModal";

const UpsertPaymentModal = () => {
  const state = useSelector((state) => state.modals[modal]);
  const dispatch = useDispatch();
  const [values, setValues] = useState();

  const { isOpen, props: { payment } = {} } = state || {};

  // Update values to set the invoice URI
  useEffect(() => {
    if (payment)
      setValues({
        ...payment,
        invoice: payment._links.invoice.href,
      });
  }, [payment, setValues]);

  // Update result and close the modal.
  const handleConfirm = async (updatedPayment) => {
    try {
      const result = await dispatch(upsert(updatedPayment));
      unwrapResult(result);
      dispatch(closeModal(modal));
    } catch (error) {
      alert("Errore durante la modifica.");
      console.error("An error occurred in the upsert dispatch.", error);
    }
  };

  return payment && !values ? null : (
    <FormModal
      schema={schema}
      isOpen={isOpen}
      defaultValues={values}
      onConfirm={handleConfirm}
      onDismiss={() => dispatch(closeModal(modal))}
    />
  );
};

UpsertPaymentModal.modal = modal;

export default UpsertPaymentModal;
