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
   * Fetch next page.
   *
   * @param {object} params - Url parameters. E.g. { page: 0, size: 10, sort: "name,asc", ... }
   */
  const fetchNextPage = useCallback(
    (params) => {
      return dispatch(actions.fetchNextPage({ params }));
    },
    [dispatch, actions]
  );

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
   * upsert an entity.
   *
   * @param {object} entity - The data of the entity. If an ID is present, the entity will be patched.
   */
  const upsert = useCallback((entity) => dispatch(actions.upsert({ entity })), [
    dispatch,
    actions,
  ]);

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
   * Set the search params.
   * If set the initial page load will use searchByMethod instead of fetchAll.
   *
   * @param {object} params - Url parameters. E.g. { page: 0, size: 10, sort: "name,asc", ... }
   */
  const setSearchArgs = useCallback(
    (args) => dispatch(actions.setSearchArgs(args)),
    [dispatch, actions]
  );

  /**
   * Interface
   */
  const api = {
    name,
    state,
    schema,
    fetchAll,
    fetchNextPage,
    searchByMethod,
    upsert,
    destroy,
    setSearchArgs,
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
