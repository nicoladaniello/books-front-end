import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";
import httpRequestStatus from "../utils/httpRequestStatus";

export const authStatus = {
  unknown: "unknown",
  authenticated: "authenticated",
  anonymous: "anonymous",
};

const initialState = {
  status: authStatus.unknown,
  user: null,
  token: null,
  loginRequest: {
    status: httpRequestStatus.idle,
    error: null,
  },
};

const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (error) {
      authService.logout();
      return rejectWithValue(error);
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout() {
      authService.logout();
      return {
        ...initialState,
        status: authStatus.anonymous,
      };
    },
    authenticate() {
      try {
        const session = authService.authenticate();
        return {
          ...initialState,
          status: authStatus.authenticated,
          user: session.user,
          token: session.token,
        };
      } catch (error) {
        return {
          ...initialState,
          status: authStatus.anonymous,
        };
      }
    },
    clearLoginRequest() {
      return initialState;
    },
  },
  extraReducers: {
    [login.pending]: () => {
      return {
        loginRequest: {
          status: httpRequestStatus.pending,
          error: null,
        },
      };
    },
    [login.fulfilled]: (state, action) => {
      return {
        status: authStatus.authenticated,
        user: action.payload.user,
        token: action.payload.token,
        loginRequest: {
          status: httpRequestStatus.fulfilled,
          error: null,
        },
      };
    },
    [login.rejected]: (state, action) => {
      return {
        user: null,
        token: null,
        status: authStatus.anonymous,
        loginRequest: {
          status: httpRequestStatus.rejected,
          error: action.payload,
        },
      };
    },
  },
});

/**
 * Exposed api
 */
const authSlice = {
  reducer: slice.reducer,
  login,
  logout: slice.actions.logout,
  authenticate: slice.actions.authenticate,
  clearLoginRequest: slice.actions.clearLoginRequest,
};

export default authSlice;
