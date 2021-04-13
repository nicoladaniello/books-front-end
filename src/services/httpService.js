/**
 * Service for HTTP requests.
 *
 * @author Nicola D'Aniello
 */

import axios from "axios";

export const httpErrorStatus = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  unexpected: 500,
  network: "network",
};

/**
 * Generic error handler for HTTP responses.
 *
 * @description Maps HTTP response errors to specific error classes.
 *
 * @param {object} error The Error object.
 */
function requestsErrorHandler(error) {
  console.error("An error occurred in your HTTP request.", error);

  if (error.response) {
    console.error("Errore nella risposta dal server.", error.response);

    if (error.response.status === 400) {
      return Promise.reject({
        status: httpErrorStatus.badRequest,
        data: error.response.data,
      });
    } else if (error.response.status === 401) {
      return Promise.reject({
        status: httpErrorStatus.unauthorized,
        data: error.response.data,
      });
    } else if (error.response.status === 403) {
      return Promise.reject({
        status: httpErrorStatus.forbidden,
        data: error.response.data,
      });
    }
  }

  if (error.request) {
    // The request was made but no response was received.
    return Promise.reject({
      status: httpErrorStatus.network,
      message: "Errore di connessione, assicurati che il server sia avviato.",
    });
  }

  // Something happened in setting up the request that triggered an Error
  return Promise.reject({
    status: httpErrorStatus.unexpected,
    message: "Errore imprevisto, riprova o riavvia il programma.",
  });
}

/**
 * Appends an Authentication Header to each request to the server.
 *
 * @param {string} token The authentication token.
 */
function setAuthToken(token) {
  axios.defaults.headers.common[process.env.AUTH_HEADER] =
    process.env.AUTH_TOKEN_PREFIX + " " + token;
}

/**
 * Clears the Authentication Header.
 */
function clearAuthToken() {
  delete axios.defaults.headers.common[process.env.AUTH_HEADER];
}

/**
 * Service setup.
 */
axios.defaults.baseURL = process.env.API_URL;
axios.interceptors.response.use(null, requestsErrorHandler);

/**
 * Interface
 */
const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setAuthToken,
  clearAuthToken,
};

export default httpService;
