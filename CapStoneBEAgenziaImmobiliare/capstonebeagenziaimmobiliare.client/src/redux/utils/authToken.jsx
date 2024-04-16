import { jwtDecode } from "jwt-decode";
import { logout } from "../actions/loginAction";

export function isTokenExpired(token) {
  const decoded = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}
export const verificaToken = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token || isTokenExpired(token)) {
    console.log("Token is expired or invalid, dispatching logout.");
    dispatch(logout());
  }
};

export const fetchWithAuth = (url, options = {}) => {
  const token = localStorage.getItem("token");

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
