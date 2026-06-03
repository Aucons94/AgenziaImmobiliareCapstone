import {
  FETCH_STAFF_BEGIN,
  FETCH_STAFF_SUCCESS,
  FETCH_STAFF_FAILURE,
  FETCH_IMMOBILI_BEGIN,
  FETCH_IMMOBILI_SUCCESS,
  FETCH_IMMOBILI_FAILURE,
  SET_TERMINI_DI_RICERCA,
} from "../constants/actionTypes";
import apiClient from "../../services/apiClient";
import { API_ENDPOINTS } from "../../config/apiConfig";

export const fetchStaffBegin = () => ({
  type: FETCH_STAFF_BEGIN,
});

export const fetchStaffSuccess = (staff) => ({
  type: FETCH_STAFF_SUCCESS,
  payload: { staff },
});

export const fetchStaffFailure = (error) => ({
  type: FETCH_STAFF_FAILURE,
  payload: { error },
});

export const fetchImmobiliBegin = () => ({
  type: FETCH_IMMOBILI_BEGIN,
});

export const fetchImmobiliSuccess = (immobili) => ({
  type: FETCH_IMMOBILI_SUCCESS,
  payload: { immobili },
});

export const fetchImmobiliFailure = (error) => ({
  type: FETCH_IMMOBILI_FAILURE,
  payload: { error },
});

export function fetchStaff() {
  return async (dispatch) => {
    dispatch(fetchStaffBegin());
    try {
      const response = await apiClient.get(API_ENDPOINTS.HOME_STAFF);
      const json = await response.json();
      dispatch(fetchStaffSuccess(json));
      return json;
    } catch (error) {
      dispatch(fetchStaffFailure(error.message));
      throw error;
    }
  };
}

export function fetchImmobili() {
  return async (dispatch) => {
    dispatch(fetchImmobiliBegin());
    try {
      const response = await apiClient.get(API_ENDPOINTS.HOME_IMMOBILI);
      const json = await response.json();
      dispatch(fetchImmobiliSuccess(json));
      return json;
    } catch (error) {
      dispatch(fetchImmobiliFailure(error.message));
      throw error;
    }
  };
}
