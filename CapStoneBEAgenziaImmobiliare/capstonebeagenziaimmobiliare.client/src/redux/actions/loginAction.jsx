import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_LOGGED_PROFILE,
  LOGOUT,
} from "../constants/actionTypes";
import apiClient from "../../services/apiClient";
import { API_ENDPOINTS } from "../../config/apiConfig";

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return {
    type: LOGIN_SUCCESS,
    payload: data.user,
  };
};

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const setLoggedProfile = (loggedProfileData) => {
  localStorage.setItem("user", JSON.stringify(loggedProfileData));
  return {
    type: SET_LOGGED_PROFILE,
    payload: loggedProfileData,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return {
    type: LOGOUT,
  };
};

export const fetchLogin = (loginObj) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH_TOKEN, loginObj);
    const loggedProfileData = await response.json();
    dispatch(loginSuccess(loggedProfileData));
  } catch (error) {
    console.error("Errore nel login:", error);
    dispatch(loginFailure(error.message || "Errore di connessione"));
  }
};
