import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../services/authService";
import {
  authenticate as authenticateAction,
  clearLoginRequest as clearLoginRequestAction,
  login as loginAction,
  logout as logoutAction,
} from "./slice";

/**
 * Hook that provides methods to manage the user authentication.
 */
const useAuth = () => {
  const { status, user, token, loginRequest } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const { isUnknown, isAuthenticated, isAnonymous } = status;

  /**
   * Authenticates an user.
   *
   * @param {object} credentials - The user credentials.
   */
  const login = useCallback(
    (credentials) => dispatch(loginAction(credentials)),
    [dispatch]
  );

  /**
   * Invalidates the current authentication.
   */
  const logout = useCallback(() => {
    authService.logout();
    dispatch(logoutAction());
  }, [dispatch]);

  /**
   * Authenticates the user from localStorage session.
   */
  const authenticate = useCallback(() => {
    try {
      const session = authService.authenticate();
      dispatch(authenticateAction(session));
    } catch (error) {
      dispatch(logoutAction());
    }
  }, [dispatch]);

  /**
   * Authenticates the user from localStorage session.
   */
  const clearLoginRequest = useCallback(
    () => dispatch(clearLoginRequestAction()),
    [dispatch]
  );

  /**
   * Try to authenticate the user if status is unknown.
   */
  useEffect(() => {
    if (isUnknown) authenticate();
  }, [isUnknown, authenticate]);

  return {
    isUnknown,
    isAuthenticated,
    isAnonymous,
    user,
    token,
    loginRequest,
    login,
    logout,
    authenticate,
    clearLoginRequest,
  };
};

export default useAuth;
