import { createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../services/apiService";

/**
 * Creates general CRUD actions for a given entity.
 *
 * @param {string} resource - The name of the resource.
 * Used in the URL endpoint and as namespace for the action types.
 */
function createCrudActions(resource) {
  // Search entities by a query method.
  const searchByMethod = createAsyncThunk(
    `${resource}/searchByMethod`,
    async ({ method, params }, { rejectWithValue }) => {
      try {
        return await apiService.searchByMethod({
          resource,
          method,
          params,
        });
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  // Fetch entities. Search entities instead if a search method is present.
  const fetchAll = createAsyncThunk(
    `${resource}/fetchAll`,
    async ({ params }, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const { search = {} } = state[resource];
        const { method, args } = search;

        if (!method) return await apiService.fetchAll({ resource, params });

        return await apiService.searchByMethod({
          resource,
          method,
          params: { ...params, ...args },
        });
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  // Fetch next page of entities.
  const fetchNextPage = createAsyncThunk(
    `${resource}/fetchNextPage`,
    async ({ params }, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const { page, search = {} } = state[resource];
        const { method, args } = search;

        if (!page || page.number >= page.totalPages - 1) return;

        const finalParams = {
          ...params,
          size: page.size,
          page: page.number + 1,
        };

        if (!method)
          return await apiService.fetchAll({ resource, params: finalParams });

        return await apiService.searchByMethod({
          resource,
          method,
          params: { ...finalParams, ...args },
        });
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  // Upsert an entity.
  const upsert = createAsyncThunk(
    `${resource}/upsert`,
    async ({ entity }, { rejectWithValue }) => {
      try {
        return await apiService.upsert({ resource, entity });
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  // Deletes an entity.
  const destroy = createAsyncThunk(
    `${resource}/destroy`,
    async ({ entity }, { rejectWithValue }) => {
      try {
        return await apiService.destroy({ resource, entity });
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  return {
    fetchAll,
    fetchNextPage,
    searchByMethod,
    upsert,
    destroy,
  };
}

export default createCrudActions;
