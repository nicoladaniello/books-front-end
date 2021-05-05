import React, { useState } from "react";
import { Button, Modal as BSModal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import apiService from "../../services/apiService";
import Autocomplete from "../common/Autocomplete";
import Modal from "../common/modal/index";
import { closeModal } from "../modals/slice";
import { loadEntities } from "./actions";
import { setSearchParams } from "./slice";

const modal = "SearchByPeriodModal";

const SearchByPeriodModal = () => {
  const { t } = useTranslation();
  const state = useSelector((state) => state.modals[modal]);
  const dispatch = useDispatch();
  const [period, setPeriod] = useState();

  const { isOpen } = state || {};

  // Update result and close the modal.
  const handleConfirm = async () => {
    dispatch(setSearchParams({ period }));
    dispatch(loadEntities());
    dispatch(closeModal(modal));
  };

  //Options loader.
  const loadOptions = async (inputValue, callback) => {
    try {
      const { _embedded } = await apiService.searchByMethod(
        "periods",
        "findByNameContainingIgnoreCase",
        { name: inputValue }
      );
      callback(_embedded.periods);
    } catch (error) {
      alert(t("messages.unexpectedError"));
      console.error("Error while loading options.", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(closeModal(modal))}>
      <BSModal.Body>
        <Autocomplete
          getOptionLabel={(period) => period.name}
          getOptionValue={(period) => period.id}
          value={period}
          loadOptions={loadOptions}
          onChange={setPeriod}
        />
      </BSModal.Body>

      <BSModal.Footer>
        <Button variant="light" onClick={() => dispatch(closeModal(modal))}>
          {t("common.dismiss")}
        </Button>
        <Button variant="primary" type="submit" onClick={handleConfirm}>
          {t("common.confirm")}
        </Button>
      </BSModal.Footer>
    </Modal>
  );
};

SearchByPeriodModal.modal = modal;

export default SearchByPeriodModal;
