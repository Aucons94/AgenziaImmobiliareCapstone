import {
  FETCH_VALUTAZIONI_REQUEST,
  FETCH_VALUTAZIONI_SUCCESS,
  FETCH_VALUTAZIONI_FAILURE,
  DELETE_VALUTAZIONE_REQUEST,
  DELETE_VALUTAZIONE_SUCCESS,
  DELETE_VALUTAZIONE_FAILURE,
  TOGGLE_ATTIVO_REQUEST,
  TOGGLE_ATTIVO_SUCCESS,
  TOGGLE_ATTIVO_FAILURE,
} from "../constants/actionTypes";
import apiClient from "../../services/apiClient";
import { API_ENDPOINTS } from "../../config/apiConfig";

export const FETCH_VALUTAZIONE_DETTAGLI_REQUEST = "FETCH_VALUTAZIONE_DETTAGLI_REQUEST";
export const FETCH_VALUTAZIONE_DETTAGLI_SUCCESS = "FETCH_VALUTAZIONE_DETTAGLI_SUCCESS";
export const FETCH_VALUTAZIONE_DETTAGLI_FAILURE = "FETCH_VALUTAZIONE_DETTAGLI_FAILURE";

const fetchValutazioniRequest = () => ({
  type: FETCH_VALUTAZIONI_REQUEST,
});

const fetchValutazioniSuccess = (valutazioni) => ({
  type: FETCH_VALUTAZIONI_SUCCESS,
  payload: valutazioni,
});

const fetchValutazioniFailure = (error) => ({
  type: FETCH_VALUTAZIONI_FAILURE,
  payload: error,
});

export const fetchValutazioni = () => {
  return async (dispatch) => {
    dispatch(fetchValutazioniRequest());
    try {
      const response = await apiClient.get(API_ENDPOINTS.GESTIONE_VALUTAZIONI);
      const data = await response.json();
      dispatch(fetchValutazioniSuccess(data));
    } catch (error) {
      dispatch(fetchValutazioniFailure(error.message));
    }
  };
};

export const deleteValutazione = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_VALUTAZIONE_REQUEST });
    try {
      await apiClient.delete(API_ENDPOINTS.GESTIONE_VALUTAZIONI_BY_ID(id));
      dispatch({ type: DELETE_VALUTAZIONE_SUCCESS, payload: id });
    } catch (error) {
      dispatch({ type: DELETE_VALUTAZIONE_FAILURE, payload: error.message });
    }
  };
};

export const fetchValutazioneDettagli = (id) => async (dispatch) => {
  dispatch({ type: FETCH_VALUTAZIONE_DETTAGLI_REQUEST });
  try {
    const response = await apiClient.get(API_ENDPOINTS.GESTIONE_VALUTAZIONI_BY_ID(id));
    const data = await response.json();
    dispatch({ type: FETCH_VALUTAZIONE_DETTAGLI_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_VALUTAZIONE_DETTAGLI_FAILURE, payload: error.message });
  }
};

export const toggleAttivo = (id, currentState) => async (dispatch) => {
  dispatch({ type: TOGGLE_ATTIVO_REQUEST, payload: id });
  dispatch({
    type: TOGGLE_ATTIVO_SUCCESS,
    payload: { id, attivo: !currentState },
  });

  try {
    await apiClient.put(API_ENDPOINTS.GESTIONE_VALUTAZIONI_TOGGLE(id), {});
  } catch (error) {
    dispatch({ type: TOGGLE_ATTIVO_FAILURE, payload: error.message });
    dispatch({
      type: TOGGLE_ATTIVO_SUCCESS,
      payload: { id, attivo: currentState },
    });
  }
};
