import { createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../services/apiService";

const name = "invoices";

/**
 * Load entities.
 *
 * Uses a search method if search parameters are present in the state.
 * Takes an object as only argument to pass extra URL parameters.
 */
const fetchOrSearchEntities = (search = {}, args) => {
  const { period, supplier } = search;

  let method;

  if (period && supplier) {
    method = "findAllBySupplierAndPeriod";
  } else if (period) {
    method = "findAllByPeriod";
  } else if (supplier) {
    method = "findAllBySupplier";
  }

  if (!method) return apiService.fetchAll(name, args);

  const params = {
    ...args,
    period: period?._links?.self?.href,
    supplier: supplier?._links?.self?.href,
  };

  return apiService.searchByMethod(name, method, params);
};

/**
 *
 */
export const loadEntities = createAsyncThunk(
  `${name}/loadEntities`,
  (args, { getState, rejectWithValue }) => {
    const state = getState();
    const { search, page } = state[name];

    const finalPage = {
      ...page,
      number: 0,
    };

    try {
      return fetchOrSearchEntities(search, finalPage);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

/**
 * Load more entities.
 *
 * If there is not a next page in the state does't run.
 * Takes an object as only argument to pass extra URL parameters.
 */
export const loadMore = createAsyncThunk(
  `${name}/loadMore`,
  (args, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { page } = state[name];

      if (!page || page.number >= page.totalPages) return;

      const params = {
        ...args,
        page: page.number + 1,
        size: page.size,
      };

      return fetchOrSearchEntities(getState(), params);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

/**
 * Insert or update an entity.
 */
export const upsert = createAsyncThunk(
  `${name}/upsert`,
  (entity, { rejectWithValue }) => {
    try {
      return apiService.upsert(name, entity);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

/**
 * Delete an entity.
 */
export const remove = createAsyncThunk(
  `${name}/remove`,
  async (entity, { rejectWithValue }) => {
    try {
      await apiService.remove(name, entity);
      return entity;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
