import React from "react";
import { Modal as BSModal } from "react-bootstrap";
import useModal from "../../../hooks/useModal";
import ConfirmModal from "./ConfirmModal";
import ErrorModal from "./ErrorModal";
import FormModal from "./FormModal";

export const modalTypes = {
  confirm: ConfirmModal,
  error: ErrorModal,
  form: FormModal,
};

const Modal = () => {
  const { isOpen, type, props, close } = useModal();

  const ModalContent = modalTypes[type];

  return (
    <BSModal show={isOpen} onHide={close}>
      {!!ModalContent && (
        <ModalContent {...props} onClose={close} />
      )}
    </BSModal>
  );
};

export default Modal;
