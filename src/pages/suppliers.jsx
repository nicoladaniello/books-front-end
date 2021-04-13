import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import ActionBar from "../components/common/ActionBar";
import { modalTypes } from "../components/common/modal/Modal";
import Pagination from "../components/common/Pagination";
import Table from "../components/common/table/Table";
import View from "../components/common/View";
import useModal from "../hooks/useModal";
import useResource from "../hooks/useResource";
import invoiceSchema from "../settings/schemas/invoices";
import schema from "../settings/schemas/suppliers";

const Suppliers = () => {
  const state = useSelector((state) => state.suppliers);
  const { destroy, fetchAll, insert, update } = useResource("suppliers");
  const invoices = useResource("invoices");
  const modal = useModal();

  /**
   * Initial fetch
   */
  useEffect(() => void fetchAll(), [fetchAll]);

  /**
   * Open a form modal to insert a new entity.
   */
  const handleInsert = () => {
    modal.show({
      type: modalTypes.form,
      props: { schema, onConfirm: insert },
    });
  };

  /**
   * Open a form modal to update an existing entity.
   *
   * @param {object} defaultValues - The entity to update.
   */
  const handleUpdate = async (defaultValues) => {
    modal.show({
      type: modalTypes.form,
      props: { schema, defaultValues, onConfirm: update },
    });
  };

  /**
   * Open a confirmation modal to delete the entity.
   *
   * @param {object} entity - The entity to delete.
   */
  const handleDelete = async (entity) => {
    const title = "Elimina Fornitore";
    const content = `Vuoi eliminare "${entity.name}"?`;

    modal.show({
      type: modalTypes.confirm,
      props: { title, content, onConfirm: destroy },
    });
  };

  /**
   * Open a form modal to insert a new invoice.
   *
   * @param {object} supplier - The invoice supplier.
   */
  const handleInsertInvoice = async (supplier) => {
    modal.show({
      type: modalTypes.form,
      props: {
        invoiceSchema,
        defaultValues: { supplier },
        onConfirm: invoices.insert,
      },
    });
  };

  /**
   * Table rows contextual menu options.
   */
  const tableContextActions = [
    { label: "Aggiungi Fattura", onClick: handleInsertInvoice },
    { label: "Modifica", onClick: handleUpdate },
    {
      label: "Elimina",
      onClick: handleDelete,
      props: { className: "text-danger" },
    },
  ];

  /**
   * UI
   */
  return (
    <View privateRoute>
      <View.Title>Scheda Fornitori</View.Title>
      <div className="col-lg-9 mx-lg-auto mb-4">{/* <FilterField /> */}</div>

      <Card>
        <Card.Header>
          <h6 className="mb-0">Risultati</h6>
        </Card.Header>
        <Card.Body>
          <ActionBar
            resultsLength={state.entities?.length}
            onInsert={handleInsert}
            addButtonDisabled={false}
          />
          <Table actions={tableContextActions} />
          <Pagination />
        </Card.Body>
      </Card>
    </View>
  );
};

export default Suppliers;
