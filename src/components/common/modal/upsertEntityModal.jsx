import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import useResource from "../../../hooks/useResource";
import { httpErrorStatus } from "../../../services/httpService";
import httpRequestStatus from "../../../utils/httpRequestStatus";
import SchemaForm from "../schema-form/SchemaForm";

/**
 *
 *
 */
const UpsertEntityModal = ({ resource, defaultValues, onClose }) => {
  const { state, schema, upsert, clearUpsertRequest } = useResource(resource);
  const { status, error } = state.upsertRequest;
  const isLoading = status === httpRequestStatus.pending;
  const [validationErrors, setValidationErrors] = useState();

  const isUpdating = defaultValues && defaultValues?.id;

  // clear state before close
  const handleClose = useCallback(() => {
    clearUpsertRequest();
    onClose();
  }, [onClose, clearUpsertRequest]);

  // Handle state changes
  useEffect(() => {
    if (status === httpRequestStatus.fulfilled) {
      handleClose();
    } else if (
      error?.status === httpErrorStatus.badRequest &&
      error.data?.errors?.length
    ) {
      setValidationErrors(error.data.errors);
    }
  }, [status, error, handleClose, setValidationErrors]);

  return (
    <SchemaForm
      schema={schema}
      defaultValues={defaultValues}
      onSubmit={upsert}
      errors={validationErrors}
    >
      {(fields) => (
        <>
          <Modal.Header>
            <Modal.Title as="h5">
              {isUpdating ? "Modifica" : "Aggiungi"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="modal-body-scrollable">
            {status === httpRequestStatus.rejected && (
              <Alert variant="danger">
                {error.data?.message || "Errore durante l'operazione."}
              </Alert>
            )}

            {fields}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="light" onClick={handleClose} disabled={isLoading}>
              Annulla
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading
                ? "Salvataggio..."
                : isUpdating
                ? "modifica"
                : "inserisci"}
            </Button>
          </Modal.Footer>
        </>
      )}
    </SchemaForm>
  );
};

export default UpsertEntityModal;
