import { createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../services/apiService";

const name = "companies";

/**
 * Load entities.
 *
 * Uses a search method if search parameters are present in the state.
 * Takes an object as only argument to pass extra URL parameters.
 */
const fetchOrSearchEntities = (search = {}, args) => {
  let method;

  if (search.name) method = "findByName";

  if (!method) return apiService.fetchAll(name, args);

  const params = {
    ...args,
    name: search.name,
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
export const upsert = createAsyncThunk(`${name}/upsert`, (entity) => {
  return apiService.upsert(name, entity);
});

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
