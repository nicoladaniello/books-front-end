import React from "react";
import { Button, Modal as BSModal } from "react-bootstrap";
import Modal from ".";
import { useTranslation } from "react-i18next";

const ConfirmationModal = ({ isOpen, onConfirm, onDismiss, children }) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onDismiss}>
      <BSModal.Body>{children}</BSModal.Body>
      <BSModal.Footer>
        <Button variant="light" onClick={() => onDismiss()}>
          {t("common.dismiss")}
        </Button>
        <Button variant="primary" onClick={() => onConfirm()}>
          {t("common.confirm")}
        </Button>
      </BSModal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
