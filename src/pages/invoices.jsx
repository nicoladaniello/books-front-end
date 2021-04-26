import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchByButton from "../components/common/SearchByButton";
import Icon from "../components/common/Icon";
import Pagination from "../components/common/Pagination";
import Table from "../components/common/table/Table";
import View from "../components/common/View";
import { loadEntities, loadMore } from "../components/invoices/actions";
import DeleteInvoiceModal from "../components/invoices/DeleteInvoiceModal";
import SearchByPeriodModal from "../components/invoices/SearchByPeriodModal";
import SearchBySupplierModal from "../components/invoices/SearchBySupplierModal";
import { openModal } from "../components/invoices/slice";
import UpsertInvoiceModal from "../components/invoices/UpsertInvoiceModal";
import schema from "../settings/schemas/invoices";

const Invoices = () => {
  const state = useSelector((state) => state.invoices);
  const dispatch = useDispatch();

  /**
   * Initial fetch
   */
  useEffect(() => void dispatch(loadEntities()), [dispatch]);

  const handleUpdate = (invoice) =>
    dispatch(
      openModal({ modal: UpsertInvoiceModal.modal, props: { invoice } })
    );

  const handleRemove = (invoice) =>
    dispatch(
      openModal({ modal: DeleteInvoiceModal.modal, props: { invoice } })
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
        <div className="my-3">
          <SearchByButton
            input={state.search?.period}
            onClick={() =>
              dispatch(openModal({ modal: SearchByPeriodModal.modal }))
            }
          >
            {state.search?.period?.name || "Seleiona periodo"}
          </SearchByButton>
          <SearchByButton
            input={state.search?.supplier}
            onClick={() =>
              dispatch(openModal({ modal: SearchBySupplierModal.modal }))
            }
          >
            {state.search?.supplier?.name || "Seleziona fornitore"}
          </SearchByButton>
        </div>
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
        <DeleteInvoiceModal />
        <SearchByPeriodModal />
        <SearchBySupplierModal />
      </div>
    </View>
  );
};

export default Invoices;
