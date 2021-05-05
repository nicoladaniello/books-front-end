import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import schema from "../../settings/schemas/invoices";
import FormModal from '../common/modal/FormModal';
import { closeModal } from "../modals/slice";
import { upsert } from "./actions";

const modal = "UpsertInvoiceModal";

const UpsertInvoiceModal = () => {
  const state = useSelector((state) => state.modals[modal]);
  const dispatch = useDispatch();
  const [values, setValues] = useState();

  const { isOpen, props: { invoice } = {} } = state || {};

  // Update values to set the supplier URI
  useEffect(() => {
    if (invoice)
      setValues({
        ...invoice,
        supplier: invoice._links.supplier.href,
      });
  }, [invoice, setValues]);

  // Update result and close the modal.
  const handleConfirm = async (updatedInvoice) => {
    try {
      const result = await dispatch(upsert(updatedInvoice));
      unwrapResult(result);
      dispatch(closeModal(modal));
    } catch (error) {
      alert("Errore durante la modifica.");
      console.error("An error occurred in the upsert dispatch.", error);
    }
  };

  return invoice && !values ? null : (
    <FormModal
      schema={schema}
      isOpen={isOpen}
      defaultValues={values}
      onConfirm={handleConfirm}
      onDismiss={() => dispatch(closeModal(modal))}
    />
  );
};

UpsertInvoiceModal.modal = modal;

export default UpsertInvoiceModal;
