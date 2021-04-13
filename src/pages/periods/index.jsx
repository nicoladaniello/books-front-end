import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import ActionBar from "../../components/common/ActionBar";
import Pagination from "../../components/common/Pagination";
import Table from "../../components/common/table/Table";
import View from "../../components/common/View";
import useModal from "../../hooks/useModal";
import useResource from "../../hooks/useResource";
import schema from "../../settings/schemas/periods";

const resource = process.env.PERIODS_ENDPOINT;

const Periods = () => {
  const { state, destroy, fetchAll, Provider } = useResource(resource);
  const modal = useModal();

  /**
   * Initial fetch
   */
  useEffect(() => void fetchAll(), [fetchAll]);

  /**
   * Opens a form dialog and inserts a new entity.
   */
  const handleInsert = () => {
    modal.form({ resource });
  };

  /**
   * Opens a form dialog and updates an existing entity.
   *
   * @param {object} defaultValues - The entity to update.
   */
  const handleUpdate = async (defaultValues) => {
    modal.form({ resource, defaultValues });
  };

  /**
   * Opens a dialog to confirm action and deletes the entity.
   *
   * @param {object} entity - The entity to delete.
   */
  const handleDelete = async (entity) => {
    modal.confirm({
      title: "Elimina periodo",
      message: `Vuoi eliminare il periodo "${entity.name}" ?`,
      action: { type: "periods/delete", payload: entity },
    });
  };

  /**
   * Select the period to inspect and redirects to the summary page.
   *
   * @param {object} period  - The period to inspect.
   */
  const view = (period) => {
    // selectPeriod(period);
    // navigate(routes.periodSummary);
  };

  /**
   * Actions for the table context menu.
   */
  const tableContextActions = [
    { label: "Visualizza situazione", onClick: view },
    { label: "Modifica periodo", onClick: handleUpdate },
    {
      label: "Elimina periodo",
      onClick: handleDelete,
      props: { className: "text-danger" },
    },
  ];

  /**
   * UI
   */
  return (
    <View privateRoute>
      <View.Title>Periodi</View.Title>
      <div className="col-lg-9 mx-lg-auto mb-4">{/* <FilterField /> */}</div>

      <Provider>
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
            <Table schema={schema} actions={tableContextActions} />
            <Pagination />
          </Card.Body>
        </Card>
      </Provider>
    </View>
  );
};

export default Periods;
