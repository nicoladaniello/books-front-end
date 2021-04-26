import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { loadEntities, loadMore, remove, upsert } from "./actions";

const initialState = {
  isLoading: false,
  error: null,
  ids: [],
  entities: {},
  page: {},
  search: {},
  modals: {},
};

const adapter = createEntityAdapter();

const slice = createSlice({
  name: "payments",
  initialState: adapter.getInitialState(initialState),
  reducers: {
    openModal(state, action) {
      const { modal, props } = action.payload;
      state.modals[modal] = {
        isOpen: true,
        props,
      };
    },
    closeModal(state, action) {
      const modal = action.payload;
      state.modals[modal] = null;
    },
    setSearchParams(state, action) {
      state.search = {
        ...state.search,
        ...action.payload,
      };
    },
  },
  extraReducers: {
    [loadEntities.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [loadEntities.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [loadEntities.fulfilled]: (state, action) => {
      state.isLoading = false;
      state._links = action.payload._links;
      state.page = action.payload.page;
      adapter.setAll(state, action.payload._embedded.payments);
    },
    [loadMore.fulfilled]: (state, action) => {
      state._links = action.payload._links;
      state.page = action.payload.page;
      adapter.addMany(state, action.payload._embedded.payments);
    },
    [upsert.fulfilled]: (state, action) => {
      adapter.upsertOne(state, action.payload);
    },
    [remove.fulfilled]: (state, action) => {
      adapter.removeOne(state, action.payload.id);
    },
  },
});

export const { openModal, closeModal, setSearchParams } = slice.actions;

export default slice.reducer;
