import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../components/common/Icon";
import Pagination from "../components/common/Pagination";
import Table from "../components/common/table/Table";
import View from "../components/common/View";
import { loadEntities, loadMore } from "../components/periods/actions";
import DeletePeriodModal from "../components/periods/DeletePeriodModal";
import { openModal } from "../components/periods/slice";
import UpsertPeriodModal from "../components/periods/UpsertPeriodModal";
import schema from "../settings/schemas/periods";

const Periods = () => {
  const state = useSelector((state) => state.periods);
  const dispatch = useDispatch();

  /**
   * Initial fetch
   */
  useEffect(() => void dispatch(loadEntities()), [dispatch]);

  const handleUpdate = (period) =>
    dispatch(openModal({ modal: UpsertPeriodModal.modal, props: { period } }));

  const handleRemove = (period) =>
    dispatch(openModal({ modal: DeletePeriodModal.modal, props: { period } }));

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
        <DeletePeriodModal />
      </div>
    </View>
  );
};

export default Periods;
