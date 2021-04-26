import httpService from "./httpService";

/**
 * A service that exposes common request methods to the API server.
 *
 * @author Nicola D'Aniello
 */

function objectToUrlParams(obj) {
  let str = "";
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) continue;

    if (str !== "") str += "&";
    str += key + "=" + encodeURIComponent(obj[key]);
  }
  return str;
}

/**
 * Search entities by a query method.
 *
 * @param {string} resource - The resource name.
 * @param {string} method - The query method name.
 * @param {object} params - Url parameters. E.g. { page: 0, size: 10, sort: "name,asc", ... }
 */
async function searchByMethod(resource, method, params) {
  const urlParams = objectToUrlParams(params);
  const { data } = await httpService.get(
    `${resource}/search/${method}?${urlParams}`
  );
  return data;
}

/**
 * Fetch all entities.
 *
 * @param {string} resource - The resource name.
 * @param {object} params - The url parameters. E.g. { page: 0, size: 10, sort: "name,asc", ... }
 */
async function fetchAll(resource, params) {
  const urlParams = objectToUrlParams(params);
  const { data } = await httpService.get(`${resource}?${urlParams}`);
  return data;
}

/**
 * Fetch an entity by its id.
 *
 * @param {string} resource - The resource name.
 * @param {string} id - The ID of the entity.
 */
async function fetchById(resource, id) {
  const { data } = await httpService.get(`${resource}/${id}`);
  return data;
}

/**
 * upsert an entity.
 *
 * @param {string} resource - The resource name.
 * @param {object} entity - The data of the entity.
 */
async function upsert(resource, entity) {
  let response;

  if (entity.id) {
    const id = entity.id;
    const data = { ...entity };
    delete data.id;
    response = await httpService.patch(`${resource}/${id}`, data);
  } else response = await httpService.post(resource, entity);

  return response.data;
}

/**
 * Remove an entity.
 *
 * @param {string} resource - The resource name.
 * @param {string} entity - The entity to delete.
 */
async function remove(resource, entity) {
  await httpService.delete(`${resource}/${entity.id}`);
}

/**
 * Shutdown the server.
 */
async function shutdown() {
  const shutdownEndpoint = `${process.env.ENDPOINT_URL}/${process.env.SHUTDOWN_API}`;
  await httpService.post(shutdownEndpoint);
}

/**
 * Interface
 */
const apiService = {
  searchByMethod,
  fetchAll,
  fetchById,
  upsert,
  remove,
  shutdown,
};

export default apiService;
