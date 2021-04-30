/**
 * A service that exposes common functions to query the server.
 *
 * @author Nicola D'Aniello
 */

import httpService from "./httpService";

/**
 * Search entities by a query method.
 *
 * @param {string} type - The entity type.
 * @param {string} method - The query method name.
 * @param {object} params - Url parameters. E.g. { page: 0, size: 10, sort: "name,asc", ... }
 */
async function searchByMethod(type, method, params) {
  const urlParams = objectToUrlParams(params);
  const { data } = await httpService.get(
    `${type}/search/${method}?${urlParams}`
  );
  return data;
}

/**
 * Fetch all entities.
 *
 * @param {string} type - The entity type.
 * @param {object} params - The url parameters. E.g. { page: 0, size: 10, sort: "name,asc", ... }
 */
async function fetchAll(type, params) {
  const urlParams = objectToUrlParams(params);
  const { data } = await httpService.get(`${type}?${urlParams}`);
  return data;
}

/**
 * Fetch an type by its id.
 *
 * @param {string} type - The entity type.
 * @param {string} id - The ID of the type.
 */
async function fetchById(type, id) {
  const { data } = await httpService.get(`${type}/${id}`);
  return data;
}

/**
 * upsert an type.
 *
 * @param {string} type - The entity type.
 * @param {object} entity - The entity of the type.
 */
async function upsert(type, entity) {
  let response;

  if (entity.id) {
    const id = entity.id;
    const data = { ...entity };
    delete data.id;
    response = await httpService.patch(`${type}/${id}`, data);
  } else response = await httpService.post(type, entity);

  return response.data;
}

/**
 * Remove an type.
 *
 * @param {string} type - The entity type.
 * @param {string} entity - The entity to delete.
 */
async function remove(type, entity) {
  await httpService.delete(`${type}/${entity.id}`);
}

/**
 * Shutdown the server.
 */
async function shutdown() {
  const shutdownEndpoint = `${process.env.ENDPOINT_URL}/${process.env.SHUTDOWN_API}`;
  await httpService.post(shutdownEndpoint);
}

/**
 * Get URL parameters from a shallow object.
 *
 * @param {object} obj - The object to serialize
 * @returns A string of URL parameters
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
 * Interface
 */
const apiService = {
  fetchAll,
  fetchById,
  searchByMethod,
  upsert,
  remove,
  shutdown,
};

export default apiService;
