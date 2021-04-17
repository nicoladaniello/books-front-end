import React from "react";
import { Modal as BSModal } from "react-bootstrap";
import useModal from "../../../hooks/useModal";
import DeleteEntityModal from "./deleteEntityModal";
import ErrorModal from "./ErrorModal";
import SearchByInvoiceModal from './SearchByInvoiceModal';
import SearchByPeriodModal from "./SearchByPeriodModal";
import SearchBySupplierModal from "./SearchBySupplierModal";
import UpsertEntityModal from "./upsertEntityModal";

export const modalTypes = {
  deleteEntity: DeleteEntityModal,
  upsertEntity: UpsertEntityModal,
  error: ErrorModal,
  searchByPeriod: SearchByPeriodModal,
  searchBySupplier: SearchBySupplierModal,
  searchByInvoice: SearchByInvoiceModal
};

const Modal = () => {
  const { isOpen, type, props, close } = useModal();

  const ModalContent = modalTypes[type];

  return (
    <BSModal
      className="d-flex justify-content-center align-items-center"
      show={isOpen}
      onHide={close}
      backdrop="static"
      keyboard={false}
    >
      {!!ModalContent && (
        <ModalContent {...props} className="w-100" onClose={close} />
      )}
    </BSModal>
  );
};

export default Modal;
