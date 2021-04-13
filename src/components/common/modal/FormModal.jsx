import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import useResource from "../../../hooks/useResource";
import { httpErrorStatus } from "../../../services/httpService";
import SchemaForm from "../schema-form/SchemaForm";

/**
 *
 *
 */
const FormModal = ({ resource, defaultValues, onClose }) => {
  const { schema, insert, update } = useResource(resource);
  const [error, setError] = useState();
  const [validationErrors, setValidationErrors] = useState();
  const [isLoading, setIsLoading] = useState();

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);

      const action = data.id ? update : insert;
      const result = await action(data);

      unwrapResult(result);
      setIsLoading(false);
      onClose();
    } catch (error) {
      if (error.status === httpErrorStatus.badRequest && error.data.errors) {
        setValidationErrors(error.data.errors);
      } else setError(error.data.message);

      setIsLoading(false);
    }
  };

  return (
    <Modal.Body>
      {error && <Alert>{error}</Alert>}

      <SchemaForm
        schema={schema}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        errors={validationErrors}
      >
        {(fields) => (
          <>
            <Modal.Title as="h5">
              {defaultValues?.id ? "Modifica" : "Inserisci"}
            </Modal.Title>

            <Modal.Body>{fields}</Modal.Body>

            <Modal.Footer>
              <Button variant="light" onClick={onClose} disabled={isLoading}>
                Annulla
              </Button>
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading
                  ? "Salvataggio..."
                  : defaultValues?.id
                  ? "modifica"
                  : "inserisci"}
              </Button>
            </Modal.Footer>
          </>
        )}
      </SchemaForm>
    </Modal.Body>
  );
};

export default FormModal;
