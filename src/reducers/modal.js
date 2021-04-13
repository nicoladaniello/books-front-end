import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: null,
  props: {},
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open(state, { payload }) {
      state.isOpen = true;
      state.type = payload.type;
      state.props = payload.props;
    },
    close() {
      return initialState;
    },
  },
});

export default modal;
