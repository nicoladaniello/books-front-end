import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const slice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal(state, action) {
      const { modal, props } = action.payload;
      state[modal] = {
        isOpen: true,
        props,
      };
    },
    closeModal(state, action) {
      const modal = action.payload;
      state[modal] = null;
    },
  },
});

export const { openModal, closeModal } = slice.actions;

export default slice.reducer;
