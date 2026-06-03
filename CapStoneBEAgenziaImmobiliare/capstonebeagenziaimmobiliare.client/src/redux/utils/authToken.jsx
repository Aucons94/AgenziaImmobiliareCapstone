import { logout } from "../actions/loginAction";
import { isTokenExpired, getToken } from "../../services/apiClient";

/**
 * Verifica il token e effettua logout se scaduto
 */
export const verificaToken = () => async (dispatch) => {
  const token = getToken();
  if (!token || isTokenExpired(token)) {
    dispatch(logout());
  }
};

/**
 * @deprecated Usa apiClient.fetch() invece
 * Mantenuto per retrocompatibilità
 */
export const fetchWithAuth = (url, options = {}) => {
  const token = getToken();

  if (!token || isTokenExpired(token)) {
    console.log("Token scaduto o mancante. Effettua il login.");
    window.location.href = "/login";
    return Promise.reject(new Error("Token scaduto o mancante."));
  }
  
  const authOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(url, authOptions);
};
