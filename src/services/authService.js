import httpService from "./httpService";
/**
 * User authentication API.
 *
 * @author Nicola D'Aniello
 */

const localStorageSessionName = "session";
const loginEndpoint = `${process.env.ENDPOINT_URL}/${process.env.LOGIN_API}`;

/**
 * Gets the user session details.
 *
 * @description Gets the user session from the localStorage.
 *
 * @returns The session object or null if the session wasn't found.
 */
function getSession() {
  const session = JSON.parse(localStorage.getItem(localStorageSessionName));

  if (!session || !session.user || !session.token) return null;

  return session;
}

/**
 * Authenticates the user.
 *
 * @description Gets the JWT token from the server, then saves the session in localstorage
 * and sets the authentication header in the httpService.
 *
 * @param {object} credentials - The login credentials.
 * @returns The session object containing the user and auth token.
 * @throws an error in case the auth header isn't found in the response.
 */
async function login(credentials) {
  const session = getSession();
  if (session) return session;

  const { data } = await httpService.post(loginEndpoint, credentials);
  const user = { name: credentials.username };
  const { token } = data;

  if (typeof window !== "undefined")
    localStorage.setItem(
      localStorageSessionName,
      JSON.stringify({ user, token })
    );

  httpService.setAuthToken(token);

  return {
    user,
    token,
  };
}

/**
 * Authenticates the user from localStorage session.
 * Sets or clear the HTTP auth token based on the authentication success.
 *
 * @returns the user session.
 * @throws an error if the session wasn't found.
 */
function authenticate() {
  const session = getSession();
  if (!session) {
    httpService.clearAuthToken();
    throw new Error("Couldn't authenticate, session not found.");
  }

  httpService.setAuthToken(session.token);
  return session;
}

/**
 * Clears the user authentication.
 */
function logout() {
  if (typeof window !== "undefined")
    localStorage.removeItem(localStorageSessionName);

  httpService.clearAuthToken();
}

/**
 * Interface
 */
const authService = {
  authenticate,
  getSession,
  login,
  logout,
};

export default authService;
