import React, { useEffect } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import useResource from "../../../hooks/useResource";
import httpRequestStatus from "../../../utils/httpRequestStatus";

const DeleteEntityModal = ({ resource, entity, title, message, onClose }) => {
  const { state, destroy } = useResource(resource);
  const { status, error } = state.deleteRequest;
  const isLoading = status === httpRequestStatus.pending;

  useEffect(() => {
    if (status === httpRequestStatus.fulfilled) onClose();
  }, [status, onClose]);

  return (
    <>
      <Modal.Body>
        {error && (
          <Alert>
            {error.data?.message || "Errore durante l'eliminazione."}
          </Alert>
        )}
        {message}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={() => onClose()} disabled={isLoading}>
          Annulla
        </Button>
        <Button
          variant="primary"
          onClick={() => destroy(entity)}
          disabled={isLoading}
        >
          {isLoading ? "Eliminando..." : "Conferma"}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default DeleteEntityModal;
