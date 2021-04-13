import { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import summary from '../reducers/summary';

const useSummary = () => {
  const { period, supplier, invoice } = useSelector((state) => state.summary);
  const dispatch = useDispatch();

  /**
   * View a period summary.
   */
  const viewPeriod = useCallback(
    (period) => dispatch(summary.viewPeriod(period)),
    [dispatch]
  );

  /**
   * View a supplier summary.
   */
  const viewSupplier = useCallback(
    (period) => dispatch(summary.viewPeriod(period)),
    [dispatch]
  );

  /**
   * View an invoice summary.
   */
  const viewInvoice = useCallback(
    (period) => dispatch(summary.viewPeriod(period)),
    [dispatch]
  );

  return {
    period,
    supplier,
    invoice,
    viewPeriod,
    viewSupplier,
    viewInvoice,
  };
};

export default useSummary;
