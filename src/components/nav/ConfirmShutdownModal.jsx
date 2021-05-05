import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import apiService from "../../services/apiService";
import ConfirmationModal from "../common/modal/ConfirmationModal";
import { closeModal } from "../modals/slice";

const modal = "ConfirmShutdownModal";

const ConfirmShutdownModal = () => {
  const { t } = useTranslation();
  const state = useSelector((state) => state.modals[modal]);
  const dispatch = useDispatch();

  const { isOpen } = state || {};

  const shutdown = async () => {
    try {
      await apiService.shutdown();
      dispatch(closeModal(modal));
      alert(t("messages.shutdown.success"));
    } catch (error) {
      console.error("Error while shutting down the server.", error);
    }
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onConfirm={shutdown}
      onDismiss={() => dispatch(closeModal(modal))}
    >
      {t("messages.shutdown.confirm")}
    </ConfirmationModal>
  );
};

ConfirmShutdownModal.modal = modal;

export default ConfirmShutdownModal;
