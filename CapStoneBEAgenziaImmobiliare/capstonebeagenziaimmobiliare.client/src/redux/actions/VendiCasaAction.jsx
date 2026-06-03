import {
  CREATE_VALUTAZIONE_REQUEST,
  CREATE_VALUTAZIONE_SUCCESS,
  CREATE_VALUTAZIONE_FAILURE,
} from "../constants/actionTypes";
import apiClient from "../../services/apiClient";
import { API_ENDPOINTS } from "../../config/apiConfig";

export const createValutazioneRequest = () => ({
  type: CREATE_VALUTAZIONE_REQUEST,
});

export const createValutazioneSuccess = (data) => ({
  type: CREATE_VALUTAZIONE_SUCCESS,
  payload: data,
});

export const createValutazioneFailure = (error) => ({
  type: CREATE_VALUTAZIONE_FAILURE,
  payload: error,
});

export const createValutazione = (valutazioneData) => async (dispatch) => {
  dispatch(createValutazioneRequest());
  try {
    const response = await apiClient.post(API_ENDPOINTS.VENDI_CASA, valutazioneData);
    const data = await response.json();
    dispatch(createValutazioneSuccess(data));
  } catch (error) {
    dispatch(createValutazioneFailure(error.message));
  }
};
