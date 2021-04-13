import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useModal from "../hooks/useModal";
import genericError from "../reducers/genericError";
import { httpErrorStatus } from "../services/httpService";

export const genericErrorTypes = {
  unauthorized: httpErrorStatus.unauthorized,
  forbidden: httpErrorStatus.forbidden,
  unexpected: httpErrorStatus.unexpected,
  network: httpErrorStatus.network,
};

/**
 * Handler for generic HTTP errors.
 */
const GenericErrorHandler = () => {
  const { hasError, type } = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const { error } = useModal();

  useEffect(() => {
    if (hasError) {
      let action = null;
      if (type === httpErrorStatus.network) action = { type: "auth/logout" };
      error({ type, action });
      dispatch(genericError.clear());
    }
  }, [hasError, type, dispatch, error]);

  return null;
};

export default GenericErrorHandler;
