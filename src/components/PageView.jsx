import React from "react";
import { Card } from "react-bootstrap";
import Pagination from "./common/Pagination";
import Table from "./common/table/Table";
import ActionBar from "./common/ActionBar";

const PageView = ({ resourceName }) => {
  /**
   * Open a form modal to insert a new entity.
   */
  const handleInsert = () => {
    modal.open("form", { schema, onConfirm: invoices.insert });
  };

  /**
   * Open a form modal to update an existing entity.
   *
   * @param {object} defaultValues - The entity to update.
   */
  const handleUpdate = async (defaultValues) => {
    modal.open("form", { schema, defaultValues, onConfirm: invoices.update });
  };

  /**
   * Open a confirmation modal to delete the entity.
   *
   * @param {object} entity - The entity to delete.
   */
  const handleDelete = async (entity) => {
    const title = "Elimina fattura";
    const content = `Vuoi eliminare "${entity.description}"?`;

    modal.open("form", { title, content, onConfirm: invoices.destroy });
  };

  /**
   * Table rows contextual menu options.
   */
  const tableContextActions = [
    { label: "Modifica", onClick: handleUpdate },
    { label: "Elimina", onClick: handleDelete },
  ];

  return (
    <>
      <Card>
        <Card.Header>
          <h6 className="mb-0">Risultati</h6>
        </Card.Header>
        <Card.Body>
          <ActionBar onInsert={handleInsert} addButtonDisabled={false} />
          <Table actions={tableContextActions} />
          <Pagination />
        </Card.Body>
      </Card>
    </>
  );
};

export default PageView;
