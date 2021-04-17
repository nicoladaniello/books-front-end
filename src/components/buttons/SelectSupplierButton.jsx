import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import useModal from "../../hooks/useModal";
import { resourceContext } from "../../hooks/useResource";

const SelectSupplierButton = () => {
  const { name, state } = useContext(resourceContext);
  const modal = useModal();

  const selected = state.search?.args?.supplier;

  return (
    <Button
      variant={selected ? "primary-light" : "light"}
      className="mr-2"
      onClick={() => modal.searchBySupplier({ resource: name })}
    >
      {selected ? selected.name : "Seleziona fornitore"}
    </Button>
  );
};

export default SelectSupplierButton;
