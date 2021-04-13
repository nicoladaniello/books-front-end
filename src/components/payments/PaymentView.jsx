import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import useModal from "../../hooks/useModal";
import useResource from "../../hooks/useResource";
import schema from "../../settings/schemas/payments";
import ActionBar from "../common/ActionBar";
import { modalTypes } from "../common/modal/Modal";
import Pagination from "../common/Pagination";
import Table from "../common/table/Table";

const PaymentView = () => {
  const state = useSelector((state) => state.payments);
  const payments = useResource("payments");
  const modal = useModal();

  /**
   * Open a form modal to insert a new entity.
   */
  const handleInsert = () => {
    modal.show({
      type: modalTypes.form,
      props: { schema, onConfirm: payments.insert },
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
      props: { schema, defaultValues, onConfirm: payments.update },
    });
  };

  /**
   * Open a confirmation modal to delete the entity.
   *
   * @param {object} entity - The entity to delete.
   */
  const handleDelete = async (entity) => {
    const title = "Elimina pagamento";
    const content = `Vuoi eliminare "${entity.name}"?`;

    modal.show({
      type: modalTypes.form,
      props: { title, content, onConfirm: payments.destroy },
    });
  };

  /**
   * Table rows contextual menu options.
   */
  const tableContextActions = [
    { label: "Modifica pagamento", onClick: handleUpdate },
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
    <>
      <div className="col-lg-9 mx-lg-auto mb-4">{/* <FilterField /> */}</div>

      <Card>
        <Card.Header>
          <h6 className="mb-0">Risultati</h6>
        </Card.Header>
        <Card.Body>
          <ActionBar
            resultsLength={state?.entities?.length}
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

export default PaymentView;
