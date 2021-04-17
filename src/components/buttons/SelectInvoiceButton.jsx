import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import useModal from "../../hooks/useModal";
import { resourceContext } from "../../hooks/useResource";

const SelectInvoiceButton = () => {
  const { name, state } = useContext(resourceContext);
  const modal = useModal();

  const selected = state.search?.args?.invoice;

  return (
    <Button
      variant={selected ? "primary-light" : "light"}
      className="mr-2"
      onClick={() => modal.searchByInvoice({ resource: name })}
    >
      {selected ? selected.description : "Seleziona fattura"}
    </Button>
  );
};

export default SelectInvoiceButton;
