import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import useModal from "../../hooks/useModal";
import useResource from "../../hooks/useResource";
import schema from "../../settings/schemas/invoices";
import paymentsSchema from "../../settings/schemas/payments";
import ActionBar from "../common/ActionBar";
import Pagination from "../common/Pagination";
import Table from "../common/table/Table";

const InvoiceView = () => {
  const state = useSelector((state) => state.invoices);
  const invoices = useResource("invoices");
  const payments = useResource("payments");
  const modal = useModal();

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
   * Open a form modal to insert a new payment.
   *
   * @param {object} invoice - The payment invoice.
   */
  const insertPayment = async (invoice) => {
    modal.show("form", {
      paymentsSchema,
      defaultValues: { invoice },
      onConfirm: payments.insert,
    });
  };

  /**
   * Table rows contextual menu options.
   */
  const tableContextActions = [
    { label: "Aggiungi pagamento", onClick: insertPayment },
    { label: "Visualizza pagamenti", onClick: () => {} },
    { label: "Modifica fattura", onClick: handleUpdate },
    {
      label: "Elimina fattura e pagamenti",
      onClick: handleDelete,
      props: { className: "text-danger" },
    },
  ];

  /**
   * UI
   */
  return (
    <>
      <div className="col-lg-9 mx-lg-auto mb-4">{/* <FilterField /> */}</div>

      <Card>
        <Card.Header>
          <h6 className="mb-0">Risultati</h6>
        </Card.Header>
        <Card.Body>
          <ActionBar
            resultsLength={state.entities.length}
            onInsert={handleInsert}
            addButtonDisabled={false}
          />
          <Table actions={tableContextActions} />
          <Pagination />
        </Card.Body>
      </Card>
    </>
  );
};

export default InvoiceView;
