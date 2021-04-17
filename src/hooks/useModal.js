import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import modal from "../reducers/modal";

/**
 *
 */
const useModal = () => {
  const { isOpen, type, props } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  /**
   * Open the modal.
   */
  const open = useCallback(
    async (type, props) => dispatch(modal.actions.open({ type, props })),
    [dispatch]
  );

  /**
   * Dispatched any provided action before closing the modal.
   */
  const close = useCallback(() => dispatch(modal.actions.close()), [dispatch]);

  /**
   * Open a modal to insert an entity.
   */
  const upsertEntity = (props) => {
    open("upsertEntity", props);
  };

  /**
   * Open a modal to delete an entity.
   */
  const deleteEntity = (props) => {
    open("deleteEntity", props);
  };

  /**
   * Open a modal to select a period as search parameter.
   */
  const searchByPeriod = (props) => {
    open("searchByPeriod", props);
  };

  /**
   * Open a modal to select a supplier as search parameter.
   */
  const searchBySupplier = (props) => {
    open("searchBySupplier", props);
  };

  /**
   * Open a modal to select a supplier as search parameter.
   */
  const searchByInvoice = (props) => {
    open("searchByInvoice", props);
  };

  /**
   * Open an error modal.
   */
  const error = (props) => {
    open("error", props);
  };

  return {
    isOpen,
    type,
    props,
    open,
    close,
    upsertEntity,
    deleteEntity,
    error,
    searchByPeriod,
    searchBySupplier,
    searchByInvoice,
  };
};

export default useModal;
