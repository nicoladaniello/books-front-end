import React from "react";
import { Button, OverlayTrigger } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ActionBar = ({
  resultsLength = 0,
  bulkDisabled,
  addButtonDisabled,
  onInsert,
  onPrint,
  onBulkDelete,
}) => {
  return (
    <div className="d-flex">
      <ul className="list-inline">
        <li className="list-inline-item">
          <OverlayTrigger overlay={<Tooltip>Elimina selezionati</Tooltip>}>
            <Button
              variant="light"
              disabled={bulkDisabled}
              onClick={onBulkDelete}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </OverlayTrigger>
        </li>
        <li className="list-inline-item">
          <OverlayTrigger overlay={<Tooltip>Stampa</Tooltip>}>
            <Button variant="light" onClick={onPrint}>
              <FontAwesomeIcon icon={faPrint} />
            </Button>
          </OverlayTrigger>
        </li>
      </ul>
      <ul className="list-inline ml-auto">
        <li className="list-inline-item mr-3 small">
          <b>{resultsLength} elementi</b>
        </li>
        <li className="list-inline-item">
          <OverlayTrigger overlay={<Tooltip>Aggiungi</Tooltip>}>
            <Button onClick={onInsert} disabled={addButtonDisabled}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </OverlayTrigger>
        </li>
      </ul>
    </div>
  );
};

export default ActionBar;
