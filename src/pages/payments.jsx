import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../components/common/Icon";
import Pagination from "../components/common/Pagination";
import SearchByButton from "../components/common/SearchByButton";
import Table from "../components/common/table/Table";
import View from "../components/common/View";
import { loadEntities, loadMore } from "../components/payments/actions";
import DeletePaymentModal from "../components/payments/DeletePaymentModal";
import SearchByInvoiceModal from "../components/payments/SearchByInvoiceModal";
import SearchByPeriodModal from "../components/payments/SearchByPeriodModal";
import SearchBySupplierModal from "../components/payments/SearchBySupplierModal";
import { openModal } from "../components/payments/slice";
import UpsertPaymentModal from "../components/payments/UpsertPaymentModal";
import schema from "../settings/schemas/payments";

const Payments = () => {
  const state = useSelector((state) => state.payments);
  const dispatch = useDispatch();

  /**
   * Initial fetch
   */
  useEffect(() => void dispatch(loadEntities()), [dispatch]);

  const handleUpdate = (payment) =>
    dispatch(
      openModal({ modal: UpsertPaymentModal.modal, props: { payment } })
    );

  const handleRemove = (payment) =>
    dispatch(
      openModal({ modal: DeletePaymentModal.modal, props: { payment } })
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
          <SearchByButton
            input={state.search?.invoice}
            onClick={() =>
              dispatch(openModal({ modal: SearchByInvoiceModal.modal }))
            }
          >
            {state.search?.invoice?.description || "Seleziona fattura"}
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
        <DeletePaymentModal />
        <SearchByPeriodModal />
        <SearchBySupplierModal />
        <SearchByInvoiceModal />
      </div>
    </View>
  );
};

export default Payments;
