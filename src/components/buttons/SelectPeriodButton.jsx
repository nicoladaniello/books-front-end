import React, { useContext } from "react";
import { Button } from 'react-bootstrap';
import useModal from "../../hooks/useModal";
import { resourceContext } from "../../hooks/useResource";

const SelectPeriodButton = () => {
  const { name, state } = useContext(resourceContext);
  const modal = useModal();

  const selected = state.search?.args?.period;

  return (
    <Button
      variant={selected ? "primary-light" : "light"}
      className="mr-2"
      onClick={() => modal.searchByPeriod({ resource: name })}
    >
      {selected ? selected.name : "Seleziona periodo"}
    </Button>
  );
};

export default SelectPeriodButton;
