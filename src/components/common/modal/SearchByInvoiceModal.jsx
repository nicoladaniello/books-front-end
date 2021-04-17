import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useResource from "../../../hooks/useResource";
import InvoiceField from "../schema-form/fields/InvoiceField";

const SearchByInvoiceModal = ({ resource, onClose }) => {
  const { state, setSearchArgs } = useResource(resource);
  const [invoice, setInvoice] = useState();

  const { search: { args = {} } = {} } = state;

  const handleConfirm = () => {
    if (args.supplier?.name !== invoice.supplierName) {
      setSearchArgs({ invoice, supplier: undefined });
    } else setSearchArgs({ invoice });

    onClose();
  };

  return (
    <>
      <Modal.Body>
        <InvoiceField
          defaultValue={invoice}
          supplier={args.supplier}
          onChange={setInvoice}
        />
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

export default SearchByInvoiceModal;
