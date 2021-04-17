import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useResource from "../../../hooks/useResource";
import PeriodField from "../schema-form/fields/PeriodField";

const SearchByPeriodModal = ({ resource, onClose }) => {
  const { state, setSearchArgs } = useResource(resource);
  const defaultValue = state.search?.args?.period;
  const [period, setPeriod] = useState();

  const handleConfirm = () => {
    setSearchArgs({ period });
    onClose();
  };

  return (
    <>
      <Modal.Body>
        <PeriodField defaultValue={defaultValue} onChange={setPeriod} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={() => onClose()}>
          Annulla
        </Button>
        <Button variant="primary" onClick={() => handleConfirm()}>
          Conferma
        </Button>
      </Modal.Footer>
    </>
  );
};

export default SearchByPeriodModal;
