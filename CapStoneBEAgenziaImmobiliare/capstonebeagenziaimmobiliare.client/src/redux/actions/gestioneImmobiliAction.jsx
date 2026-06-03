import {
  GET_IMMOBILI_REQUEST,
  GET_IMMOBILI_SUCCESS,
  GET_IMMOBILI_FAILURE,
  DELETE_IMMOBILE_REQUEST,
  DELETE_IMMOBILE_SUCCESS,
  DELETE_IMMOBILE_FAILURE,
} from "../constants/actionTypes";
import apiClient from "../../services/apiClient";
import { API_ENDPOINTS } from "../../config/apiConfig";

export const getImmobili = () => async (dispatch) => {
  dispatch({ type: GET_IMMOBILI_REQUEST });

  try {
    const response = await apiClient.get(API_ENDPOINTS.GESTIONE_IMMOBILI);
    const data = await response.json();
    dispatch({ type: GET_IMMOBILI_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_IMMOBILI_FAILURE, payload: error.message });
  }
};

export const deleteImmobile = (idImmobile) => async (dispatch) => {
  dispatch({ type: DELETE_IMMOBILE_REQUEST });

  try {
    await apiClient.delete(API_ENDPOINTS.GESTIONE_IMMOBILI_BY_ID(idImmobile));
    dispatch({ type: DELETE_IMMOBILE_SUCCESS, payload: idImmobile });
  } catch (error) {
    dispatch({ type: DELETE_IMMOBILE_FAILURE, payload: error.message });
  }
};
