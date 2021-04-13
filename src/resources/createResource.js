import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import createResourceActions from "../actions/createResourceActions";
import httpRequestStatus from '../utils/httpRequestStatus';

// Initial state
const initialState = {
  status: httpRequestStatus.idle,
  error: null,
  page: null,
};

/**
 *
 */
const createResource = (name) => {
  const actions = createResourceActions(name);
  const adapter = createEntityAdapter();

  /**
   * Slice
   */
  const slice = createSlice({
    name,
    initialState: adapter.getInitialState(initialState),
    extraReducers: {
      [actions.destroy.fulfilled]: (state, action) => {
        adapter.removeOne(state, action.payload);
      },
      [actions.fetchAll.pending]: (state) => {
        state.status = httpRequestStatus.pending;
        state.error = null;
      },
      [actions.fetchAll.fulfilled]: (state, action) => {
        adapter.setAll(state, action.payload._embedded[name]);
        state.status = httpRequestStatus.fulfilled;
        state.page = action.payload.page;
      },
      [actions.fetchAll.rejected]: (state, action) => {
        state.status = httpRequestStatus.rejected;
        state.error = action.payload;
      },
      [actions.fetchById.fulfilled]: (state, action) => {
        adapter.upsertOne(state, action.payload);
      },
      [actions.insert.fulfilled]: (state, action) => {
        adapter.upsertOne(state, action.payload);
      },
      [actions.searchByMethod.pending]: (state) => {
        state.status = httpRequestStatus.pending;
        state.error = null;
      },
      [actions.searchByMethod.fulfilled]: (state, action) => {
        adapter.setAll(state, action.payload._embedded[name]);
        state.status = httpRequestStatus.fulfilled;
        state.page = action.payload.page;
      },
      [actions.searchByMethod.rejected]: (state, action) => {
        state.status = httpRequestStatus.rejected;
        state.error = action.payload;
      },
      [actions.update.fulfilled]: (state, action) => {
        adapter.upsertOne(state, action.payload);
      },
    },
  });

  return {
    name,
    actions,
    reducer: slice.reducer,
  };
};

export default createResource;
