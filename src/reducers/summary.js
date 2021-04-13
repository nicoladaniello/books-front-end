import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  period: null,
  supplier: null,
  invoice: null,
};

const slice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    viewPeriod(state, { payload }) {
      state.period = payload;
    },
    viewSupplier(state, { payload }) {
      if (!state.period) return;
      state.supplier = payload;
    },
    viewInvoice(state, { payload }) {
      if (!state.supplier) return;
      state.invoice = payload;
    },
  },
});

const summary = {
  reducer: slice.reducer,
  viewPeriod: slice.actions.viewPeriod,
  viewSupplier: slice.actions.viewSupplier,
  viewInvoice: slice.actions.viewInvoice,
};

export default summary;
