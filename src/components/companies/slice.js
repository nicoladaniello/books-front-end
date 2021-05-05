import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { loadEntities, loadMore, remove, upsert } from "./actions";

const initialState = {
  isLoading: false,
  error: null,
  ids: [],
  entities: {},
  page: {},
};

const adapter = createEntityAdapter();

const slice = createSlice({
  name: "companies",
  initialState: adapter.getInitialState(initialState),
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
      adapter.setAll(state, action.payload._embedded.companies);
    },
    [loadMore.fulfilled]: (state, action) => {
      state._links = action.payload._links;
      state.page = action.payload.page;
      adapter.addMany(state, action.payload._embedded.companies);
    },
    [upsert.fulfilled]: (state, action) => {
      adapter.upsertOne(state, action.payload);
    },
    [remove.fulfilled]: (state, action) => {
      adapter.removeOne(state, action.payload.id);
    },
  },
});

export default slice.reducer;
