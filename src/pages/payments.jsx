import React, { useEffect } from "react";
import SelectInvoiceButton from "../components/buttons/SelectInvoiceButton";
import SelectPeriodButton from "../components/buttons/SelectPeriodButton";
import SelectSupplierButton from "../components/buttons/SelectSupplierButton";
import Icon from "../components/common/Icon";
import Pagination from "../components/common/Pagination";
import Table from "../components/common/table/Table";
import View from "../components/common/View";
import useModal from "../hooks/useModal";
import useResource from "../hooks/useResource";

const resource = process.env.PAYMENTS_ENDPOINT;

const Payments = () => {
  const { fetchAll, Provider } = useResource(resource);
  const modal = useModal();

  /**
   * Initial fetch
   */
  useEffect(() => void fetchAll(), [fetchAll]);

  /**
   * Opens a form dialog and updates an existing entity.
   *
   * @param {object} defaultValues - The entity to update.
   */
  const handleUpdate = async (defaultValues) => {
    modal.upsertEntity({ resource, defaultValues });
  };

  /**
   * Opens a dialog to confirm action and deletes the entity.
   *
   * @param {object} entity - The entity to delete.
   */
  const handleDelete = async (entity) => {
    modal.deleteEntity({
      title: "Elimina pagamento",
      message: `Vuoi eliminare il pagamento "${entity.description}"?`,
      resource,
      entity,
    });
  };

  const tableRowActions = [
    { label: <Icon icon="edit" />, onClick: handleUpdate },
    {
      label: <Icon icon="trash-alt" />,
      onClick: handleDelete,
    },
  ];

  /**
   * UI
   */
  return (
    <View privateRoute>
      <Provider>
        <div className="h-100 px-3" style={{ overflowY: "auto" }}>
          <div className="my-3">
            <SelectPeriodButton />
            <SelectSupplierButton />
            <SelectInvoiceButton />
          </div>
          <Table actions={tableRowActions} />
          <Pagination />
        </div>
      </Provider>
    </View>
  );
};

export default Payments;
