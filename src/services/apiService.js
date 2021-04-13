import httpService from "./httpService";

/**
 * A service that exposes common request methods to the API server.
 *
 * @author Nicola D'Aniello
 */

/**
 * Delete an entity.
 *
 * @param {object} args - The function arguments.
 * @param {string} args.resource - The resource name.
 * @param {string} args.entity - The entity to delete.
 */
async function destroy({ resource, entity }) {
  await httpService.delete(`${resource}/${entity.id}`);
}

/**
 * Fetch all entities.
 *
 * @param {object} args - The function arguments.
 * @param {string} args.resource - The resource name.
 * @param {object} args.params - The url parameters. E.g. { page: 0, size: 10, sort: "name,asc", ... }
 */
async function fetchAll({ resource, params }) {
  const urlParams = new URLSearchParams(params).toString();
  const { data } = await httpService.get(`${resource}?${urlParams}`);
  return data;
}

/**
 * Fetch an entity by its id.
 *
 * @param {object} args - The function arguments.
 * @param {string} args.resource - The resource name.
 * @param {string} args.id - The ID of the entity.
 */
async function fetchById({ resource, id }) {
  const { data } = await httpService.get(`${resource}/${id}`);
  return data;
}

/**
 * Insert a new entity.
 *
 * @param {object} args - The function arguments.
 * @param {string} args.resource - The resource name.
 * @param {object} args.entity - The data of the entity.
 */
async function insert({ resource, entity }) {
  const { data } = await httpService.post(resource, entity);
  return data;
}

/**
 * Search entities by a query method.
 *
 * @param {object} args - The function arguments.
 * @param {string} args.resource - The resource name.
 * @param {string} args.method - The query method name.
 * @param {object} args.params - Url parameters. E.g. { page: 0, size: 10, sort: "name,asc", ... }
 */
async function searchByMethod({ resource, method, params }) {
  const urlParams = new URLSearchParams(params).toString();
  const { data } = await httpService.get(
    `${resource}/search/${method}?${urlParams}`
  );
  return data;
}

/**
 * Patch an entity.
 *
 * @param {object} args - The function arguments.
 * @param {string} args.resource - The resource name.
 * @param {object} args.entity - The entity data.
 */
async function update({ resource, entity }) {
  const id = entity.id;
  const data = { ...entity };
  delete data.id;
  const response = await httpService.patch(`${resource}/${id}`, data);
  return response.data;
}

/**
 * Interface
 */
const apiService = {
  destroy,
  fetchAll,
  fetchById,
  insert,
  searchByMethod,
  update,
};

export default apiService;
