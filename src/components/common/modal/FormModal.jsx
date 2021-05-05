import React from "react";
import { Button, Modal as BSModal } from "react-bootstrap";
import Modal from ".";
import SchemaForm from "../form/SchemaForm";
import { useTranslation } from "react-i18next";

const FormModal = ({
  isOpen,
  title,
  schema,
  defaultValues,
  errors,
  onConfirm,
  onDismiss,
}) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onDismiss}>
      {!!title && (
        <BSModal.Header>
          <BSModal.Title as="h5">{title}</BSModal.Title>
        </BSModal.Header>
      )}

      <SchemaForm
        schema={schema}
        defaultValues={defaultValues}
        onSubmit={onConfirm}
        errors={errors}
      >
        {(fields) => (
          <>
            <BSModal.Body className="modal-body-scrollable">
              {fields}
            </BSModal.Body>

            <BSModal.Footer>
              <Button variant="light" onClick={onDismiss}>
                {t("common.dismiss")}
              </Button>
              <Button variant="primary" type="submit">
                {t("common.confirm")}
              </Button>
            </BSModal.Footer>
          </>
        )}
      </SchemaForm>
    </Modal>
  );
};

export default FormModal;
