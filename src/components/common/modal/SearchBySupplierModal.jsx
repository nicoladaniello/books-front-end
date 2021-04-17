import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useResource from "../../../hooks/useResource";
import SupplierField from "../schema-form/fields/SupplierField";

const SearchBySupplierModal = ({ resource, onClose }) => {
  const { state, setSearchArgs } = useResource(resource);
  const defaultValue = state.search?.args?.supplier;
  const [supplier, setSupplier] = useState();

  const handleConfirm = () => {
    if (state.search?.args?.invoice?.supplierName !== supplier?.name) {
      setSearchArgs({ supplier, invoice: undefined });
    } else setSearchArgs({ supplier });
    onClose();
  };

  return (
    <>
      <Modal.Body>
        <SupplierField defaultValue={defaultValue} onChange={setSupplier} />
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

export default SearchBySupplierModal;
