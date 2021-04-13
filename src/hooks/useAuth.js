import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authSlice, { authStatus } from "../reducers/authSlice";

/**
 * Hook that provides methods to manage the user authentication.
 */
const useAuth = () => {
  const { status, user, token, loginRequest } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  /**
   * Authenticates an user.
   *
   * @param {object} credentials - The user credentials.
   */
  const login = useCallback(
    (credentials) => dispatch(authSlice.login(credentials)),
    [dispatch]
  );

  /**
   * Invalidates the current authentication.
   */
  const logout = useCallback(() => dispatch(authSlice.logout()), [dispatch]);

  /**
   * Authenticates the user from localStorage session.
   */
  const authenticate = useCallback(() => dispatch(authSlice.authenticate()), [
    dispatch,
  ]);

  /**
   * Authenticates the user from localStorage session.
   */
  const clearLoginRequest = useCallback(
    () => dispatch(authSlice.clearLoginRequest()),
    [dispatch]
  );

  /**
   * Try to authenticate the user if status is unknown.
   */
  useEffect(() => {
    if (status === authStatus.unknown) authenticate();
  }, [status, authenticate]);

  return {
    status,
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
