import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FormModal from "../common/modal/FormModal";
import { upsert } from "./actions";
import { closeModal } from "./slice";

const modal = "UpsertEntityModal";

/**
 * Generic form modal to update or insert an entity.
 */
const UpsertEntityModal = () => {
  // TODO: Get the entity values from the URL params
  const entity = {};
  const {name, schema} = entity;

  const dispatch = useDispatch();

  const state = useSelector((state) => state[name].modals[modal]);
  const { isOpen, props } = state;

  // Update result and close the modal.
  const handleConfirm = async (data) => {
    try {
      const result = await dispatch(upsert({ name, data }));
      unwrapResult(result);
      dispatch(closeModal(modal));
    } catch (error) {
      alert("An error occurred during the operation.");
      console.error("An error occurred in the upsert dispatch.", error);
    }
  };

  return (
    <FormModal
      schema={schema}
      isOpen={isOpen}
      defaultValues={props.data}
      onConfirm={handleConfirm}
      onDismiss={() => dispatch(closeModal(modal))}
    />
  );
};

UpsertEntityModal.modal = modal;

export default UpsertEntityModal;
