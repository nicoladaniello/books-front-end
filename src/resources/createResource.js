import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import createCrudActions from "../actions/createCrudActions";
import httpRequestStatus from "../utils/httpRequestStatus";

// Initial state
const initialState = {
  status: httpRequestStatus.idle,
  error: null,
  page: null,
  search: {
    method: null,
    args: {},
  },
  fetchRequest: {
    status: httpRequestStatus.idle,
    error: null,
  },
  fetchNextPageRequest: {
    status: httpRequestStatus.idle,
    error: null,
  },
  upsertRequest: {
    status: httpRequestStatus.idle,
    error: null,
    data: null,
  },
  deleteRequest: {
    status: httpRequestStatus.idle,
    error: null,
  },
};

function getSearchMethod(resource, args) {
  const { period, supplier, invoice } = args;

  let method = null;

  switch (resource) {
    case "invoices":
      if (period && supplier) {
        method = "findAllBySupplierAndPeriod";
      } else if (period) {
        method = "findAllByPeriod";
      } else if (supplier) {
        method = "findAllBySupplier";
      }
      break;

    case "payments":
      if (period && invoice) {
        method = "findAllByPeriodAndInvoice";
      } else if (period && supplier) {
        method = "findAllByPeriodAndSupplier";
      } else if (invoice) {
        method = "findAllByInvoice";
      } else if (supplier) {
        method = "findAllBySupplier";
      } else if (period) {
        method = "findAllByPeriod";
      }

    default:
      break;
  }

  return method;
}

/**
 *
 */
const createResource = (name) => {
  const actions = createCrudActions(name);
  const adapter = createEntityAdapter();

  /**
   * Slice
   */
  const slice = createSlice({
    name,
    initialState: adapter.getInitialState(initialState),
    reducers: {
      clearFetchRequest(state) {
        state.fetchRequest = {};
      },
      clearUpsertRequest(state) {
        state.upsertRequest = {};
      },
      clearDeleteRequest(state) {
        state.deleteRequest = {};
      },
      setSearchArgs: (state, action) => {
        const args = {
          ...state.search.args,
          ...action.payload,
        };

        const method = getSearchMethod(name, args);

        state.search.args = args;
        state.search.method = method;
      },
    },
    extraReducers: {
      [actions.fetchAll.pending || actions.searchByMethod.pending]: (state) => {
        state.fetchRequest.status = httpRequestStatus.pending;
        state.fetchRequest.error = null;
      },
      [actions.fetchNextPage.pending]: (state) => {
        state.fetchNextPageRequest.status = httpRequestStatus.pending;
        state.fetchNextPageRequest.error = null;
      },
      [actions.upsert.pending]: (state) => {
        state.upsertRequest.status = httpRequestStatus.pending;
        state.upsertRequest.error = null;
      },
      [actions.destroy.pending]: (state) => {
        state.deleteRequest.status = httpRequestStatus.pending;
        state.deleteRequest.error = null;
      },

      [actions.fetchAll.fulfilled]: (state, action) => {
        adapter.setAll(state, action.payload._embedded[name]);
        state.status = httpRequestStatus.fulfilled;
        state.page = action.payload.page;
      },
      [actions.fetchNextPage.fulfilled]: (state, action) => {
        adapter.addMany(state, action.payload._embedded[name]);
        state.fetchNextPageRequest.status = httpRequestStatus.fulfilled;
        state.page = action.payload.page;
      },
      [actions.searchByMethod.fulfilled]: (state, action) => {
        adapter.setAll(state, action.payload._embedded[name]);
        state.status = httpRequestStatus.fulfilled;
        state.page = action.payload.page;
      },
      [actions.upsert.fulfilled]: (state, action) => {
        adapter.upsertOne(state, action.payload);
        state.upsertRequest.status = httpRequestStatus.fulfilled;
      },
      [actions.destroy.fulfilled]: (state, action) => {
        state.deleteRequest.status = httpRequestStatus.fulfilled;
        adapter.removeOne(state, action.payload);
      },

      [actions.fetchAll.rejected]: (state, action) => {
        state.fetchRequest.status = httpRequestStatus.rejected;
        state.fetchRequest.error = action.payload;
      },
      [actions.fetchNextPage.rejected]: (state, action) => {
        state.fetchNextPageRequest.status = httpRequestStatus.rejected;
        state.fetchNextPageRequest.error = action.payload;
      },
      [actions.searchByMethod.rejected]: (state, action) => {
        state.fetchRequest.status = httpRequestStatus.rejected;
        state.fetchRequest.error = action.payload;
      },
      [actions.upsert.rejected]: (state, action) => {
        state.upsertRequest.status = httpRequestStatus.rejected;
        state.upsertRequest.error = action.payload;
      },
      [actions.destroy.rejected]: (state, action) => {
        state.deleteRequest.status = httpRequestStatus.rejected;
        state.deleteRequest.error = action.payload;
      },
    },
  });

  return {
    name,
    initialState,
    actions: {
      ...actions,
      ...slice.actions,
    },
    reducer: slice.reducer,
  };
};

export default createResource;
