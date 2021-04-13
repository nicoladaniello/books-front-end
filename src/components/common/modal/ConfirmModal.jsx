import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

const ConfirmModal = ({ title, message, action, onClose }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    if (action) dispatch(action);
    onClose();
  };

  return (
    <>
      <Modal.Title as="h5">{title}</Modal.Title>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onClose()}>
          Chiudi
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Conferma
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ConfirmModal;
