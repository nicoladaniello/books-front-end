import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import modal from "../reducers/modal";

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
   * Open a form modal.
   */
  const form = (props) => {
    open("form", props);
  };

  /**
   * Open a confirmation modal.
   */
  const confirm = (props) => {
    open("confirm", props);
  };

  /**
   * Open an error modal.
   */
  const error = (props) => {
    open("error", props);
  };

  /**
   * Dispatched any provided action before closing the modal.
   */
  const close = useCallback(() => dispatch(modal.actions.close()), [dispatch]);

  return {
    isOpen,
    type,
    props,
    open,
    form,
    confirm,
    error,
    close,
  };
};

export default useModal;
