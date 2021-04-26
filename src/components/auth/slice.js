import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import httpRequestStatus from "../../utils/httpRequestStatus";

const initialState = {
  status: {
    isUnknown: true,
    isAuthenticated: false,
    isAnonymous: false,
  },
  user: null,
  token: null,
  loginRequest: {
    status: httpRequestStatus.idle,
    error: null,
  },
};

export const login = createAsyncThunk(
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
    logout(state) {
      state.status = { isAnonymous: true };
      state.user = null;
      state.token = null;
    },
    authenticate(state, action) {
      const { user, token } = action.payload;
      state.status = { isAuthenticated: true };
      state.user = user;
      state.token = token;
    },
    clearLoginRequest() {
      return initialState;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loginRequest = {
        status: httpRequestStatus.pending,
        error: null,
      };
    },
    [login.fulfilled]: (state, action) => {
      const { user, token } = action.payload;

      state.loginRequest = {
        status: httpRequestStatus.fulfilled,
        error: null,
      };
      state.status = { isAuthenticated: true };
      state.user = user;
      state.token = token;
    },
    [login.rejected]: (state, action) => {
      state.loginRequest = {
        status: httpRequestStatus.rejected,
        error: action.payload,
      };
      state.status = { isAnonymous: true };
      state.user = null;
      state.token = null;
    },
  },
});

/**
 * Exposed api
 */
export const { logout, authenticate, clearLoginRequest } = slice.actions;

export default slice.reducer;
