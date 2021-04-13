import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasError: false,
  type: null,
  message: null,
};

const slice = createSlice({
  name: "error",
  initialState,
  reducers: {
    set(state, { payload }) {
      state.hasError = true;
      state.type = payload.name;
      state.message = payload.message;
    },
    clear() {
      return initialState;
    },
  },
});

const genericError = {
  reducer: slice.reducer,
  set: slice.actions.set,
  clear: slice.actions.clear,
};

export default genericError;
