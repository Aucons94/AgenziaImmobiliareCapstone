import {
  GET_IMMOBILE_DETAILS_REQUEST,
  GET_IMMOBILE_DETAILS_SUCCESS,
  GET_IMMOBILE_DETAILS_FAIL,
} from "../constants/actionTypes";
import apiClient from "../../services/apiClient";
import { API_ENDPOINTS } from "../../config/apiConfig";

export const getDettaglioImmobile = (idImmobile) => async (dispatch) => {
  dispatch({ type: GET_IMMOBILE_DETAILS_REQUEST });
  try {
    const response = await apiClient.get(API_ENDPOINTS.DETTAGLIO_IMMOBILE(idImmobile));
    const data = await response.json();
    dispatch({ type: GET_IMMOBILE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_IMMOBILE_DETAILS_FAIL, payload: error.message });
  }
};
