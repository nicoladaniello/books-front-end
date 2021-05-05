import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../components/common/Icon";
import Pagination from "../components/common/Pagination";
import Table from "../components/common/table/Table";
import View from "../components/common/View";
import { openModal } from "../components/modals/slice";
import { loadEntities, loadMore } from "../components/suppliers/actions";
import DeleteSupplierModal from "../components/suppliers/DeleteSupplierModal";
import UpsertSupplierModal from "../components/suppliers/UpsertSupplierModal";
import schema from "../settings/schemas/suppliers";

const Suppliers = () => {
  const state = useSelector((state) => state.suppliers);
  const dispatch = useDispatch();

  /**
   * Initial fetch
   */
  useEffect(() => void dispatch(loadEntities()), [dispatch]);

  const handleUpdate = (supplier) =>
    dispatch(
      openModal({ modal: UpsertSupplierModal.modal, props: { supplier } })
    );

  const handleRemove = (supplier) =>
    dispatch(
      openModal({ modal: DeleteSupplierModal.modal, props: { supplier } })
    );

  // Table row actions
  const actions = [
    { label: <Icon icon="edit" />, onClick: handleUpdate },
    {
      label: <Icon icon="trash-alt" />,
      onClick: handleRemove,
    },
  ];

  /**
   * UI
   */
  return (
    <View privateRoute>
      <div className="h-100 px-3" style={{ overflowY: "auto" }}>
        <Table
          schema={schema}
          ids={state.ids}
          entities={state.entities}
          page={state.page}
          isLoading={state.isLoading}
          actions={actions}
        />
        <Pagination
          page={state.page}
          isLoading={state.isLoading}
          onLoadMore={() => dispatch(loadMore())}
        />
        <DeleteSupplierModal />
      </div>
    </View>
  );
};

export default Suppliers;
