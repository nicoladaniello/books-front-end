import React from "react";
import { Button, Modal as BSModal } from "react-bootstrap";
import Modal from ".";

const ConfirmationModal = ({ isOpen, onConfirm, onDismiss, children }) => (
  <Modal isOpen={isOpen} onClose={onDismiss}>
    <BSModal.Body>{children}</BSModal.Body>
    <BSModal.Footer>
      <Button variant="light" onClick={() => onDismiss()}>
        Annulla
      </Button>
      <Button variant="primary" onClick={() => onConfirm()}>
        Conferma
      </Button>
    </BSModal.Footer>
  </Modal>
);

export default ConfirmationModal;
