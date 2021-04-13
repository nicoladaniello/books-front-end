import { createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../services/apiService";

function createnameActions(name) {
  /**
   * Deletes an entity.
   */
  const destroy = createAsyncThunk(
    `${name}/destroy`,
    async ({ entity }, { rejectWithValue }) => {
      try {
        return await apiService.destroy({ resource: name, entity });
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  /**
   * Fetch all entities.
   */
  const fetchAll = createAsyncThunk(
    `${name}/fetchAll`,
    async ({ params }, { rejectWithValue }) => {
      try {
        return await apiService.fetchAll({ resource: name, params });
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  /**
   * Fetch an entity by its id.
   */
  const fetchById = createAsyncThunk(
    `${name}/fetchById`,
    async ({ id }, { rejectWithValue }) => {
      try {
        return await apiService.fetchById({ resource: name, id });
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  /**
   * Insert a new entity.
   */
  const insert = createAsyncThunk(
    `${name}/insert`,
    async ({ entity }, { rejectWithValue }) => {
      try {
        return await apiService.insert({ resource: name, entity });
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  /**
   * Search entities by a query method.
   */
  const searchByMethod = createAsyncThunk(
    `${name}/searchByMethod`,
    async ({ method, params }, { rejectWithValue }) => {
      try {
        await apiService.searchByMethod({ resource: name, method, params });
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  /**
   * Patch an entity.
   */
  const update = createAsyncThunk(
    `${name}/update`,
    async ({ entity }, { rejectWithValue }) => {
      try {
        await apiService.update({ resource: name, entity });
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  return {
    destroy,
    fetchAll,
    fetchById,
    insert,
    update,
    searchByMethod,
  };
}

export default createnameActions;
