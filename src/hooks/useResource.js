import React, { createContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import resources from "../resources/resourceFactory";

export const resourceContext = createContext();

/**
 * Hook that exposes a specific resource API methods.
 *
 * @param {object} name The name of the resource.
 * @returns the resource API methods.
 */
const useResource = (name) => {
  const { actions, schema } = resources[name];
  const state = useSelector((state) => state[name]);
  const dispatch = useDispatch();

  /**
   * Delete entity by id.
   *
   * @param {string} id - The ID of the entity.
   */
  const destroy = useCallback(
    (entity) => dispatch(actions.destroy({ entity })),
    [dispatch, actions]
  );

  /**
   * Fetch all entities.
   *
   * @param {object} params - Url parameters. E.g. { page: 0, size: 10, sort: "name,asc", ... }
   */
  const fetchAll = useCallback(
    (params) => {
      return dispatch(actions.fetchAll({ params }));
    },
    [dispatch, actions]
  );

  /**
   * Fetch entity by id.
   *
   * @param {string} id - The ID of the entity.
   */
  const fetchById = useCallback((id) => dispatch(actions.fetchById({ id })), [
    dispatch,
    actions,
  ]);

  /**
   * Insert a new entity.
   *
   * @param {object} entity - The data of the entity.
   */
  const insert = useCallback((entity) => dispatch(actions.insert({ entity })), [
    dispatch,
    actions,
  ]);

  /**
   * Search entities by a query method.
   *
   * @param {string} method - The query method name.
   * @param {object} params - Url parameters. E.g. { page: 0, size: 10, sort: "name,asc", ... }
   */
  const searchByMethod = useCallback(
    (method, params) => dispatch(actions.searchByMethod({ method, params })),
    [dispatch, actions]
  );

  /**
   * Update entity by id.
   *
   * @param {object} entity - The data to update.
   */
  const update = useCallback((entity) => dispatch(actions.update({ entity })), [
    dispatch,
    actions,
  ]);

  /**
   * Clear the request details keeping the data.
   */
  const clearRequest = useCallback(() => dispatch(actions.clearRequest()), [
    dispatch,
    actions,
  ]);

  /**
   * Interface
   */
  const api = {
    state,
    schema,
    searchByMethod,
    fetchAll,
    fetchById,
    insert,
    update,
    destroy,
    clearRequest,
  };

  /**
   * Context provider
   */
  const Provider = (props) => (
    <resourceContext.Provider {...props} value={api} />
  );

  /**
   * Interface
   */
  return {
    ...api,
    Provider,
  };
};

export default useResource;
